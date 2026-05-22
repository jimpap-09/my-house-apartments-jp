#!/bin/bash
set -e

# 📍 Find the absolute directory of the script and navigate to the backend folder
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE}")" && pwd)"
cd "$SCRIPT_DIR/.."

echo "Current directory is now: $(pwd)"

# 🧹 1. Clean up local generated folders if they exist
echo "Cleaning up existing models and migrations..."
rm -rf models migrations config seeders .sequelizerc

echo "Installing packages..."
npm install sequelize pg pg-hstore dotenv
npm install -D sequelize-cli

echo "Initializing sequelize..."
npx sequelize-cli init --force

# 🛠️ 2. Configure Sequelize for Neon (Postgres via .env)
echo "Replacing config.json with dynamic config.js..."
rm config/config.json

cat << 'EOF' > config/config.js
require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  }
};
EOF

# 🎛️ 3. Tell Sequelize CLI to ALWAYS look for config.js instead of config.json
echo "Creating .sequelizerc configuration..."
cat << 'EOF' > .sequelizerc
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js'),
  'models-path': path.resolve('models'),
  'seeders-path': path.resolve('seeders'),
  'migrations-path': path.resolve('migrations')
};
EOF

# 🏗️ 4. Generate Models & Migrations
echo "Generating models & migrations..."
npx sequelize-cli model:generate --name Apartment --attributes title:string,description:text,pricePerNight:float,location:string
npx sequelize-cli model:generate --name User --attributes username:string,password:string,firstName:string,lastName:string,email:string,phone:string,role:string
npx sequelize-cli model:generate --name Review --attributes apartmentId:integer,userId:integer,rating:integer,comment:text
npx sequelize-cli model:generate --name Reservation --attributes apartmentId:integer,userId:integer,guestName:string,checkIn:date,checkOut:date

# 🛡️ 5. Inject Constraints & Defaults into Migrations
#Apartment Constraints (title/location mandatory, pricePerNight mandatory with default 0)
echo "Applying constraints and defaults automatically via sed..."
sed -i 's/title: {/title: {\n        allowNull: false,/g' migrations/*-create-apartment.js
sed -i 's/location: {/location: {\n        allowNull: false,/g' migrations/*-create-apartment.js
sed -i 's/pricePerNight: {/pricePerNight: {\n        allowNull: false,\n        defaultValue: 0,/g' migrations/*-create-apartment.js

# User Constraints (username/password allow null, others are mandatory and unique)
sed -i 's/username: {/username: {\n        allowNull: true,/g' migrations/*-create-user.js
sed -i 's/password: {/password: {\n        allowNull: true,/g' migrations/*-create-user.js
sed -i 's/firstName: {/firstName: {\n        allowNull: false,/g' migrations/*-create-user.js
sed -i 's/lastName: {/lastName: {\n        allowNull: false,/g' migrations/*-create-user.js
sed -i 's/email: {/email: {\n        allowNull: false,\n        unique: true,/g' migrations/*-create-user.js
sed -i 's/phone: {/phone: {\n        allowNull: false,\n        unique: true,/g' migrations/*-create-user.js
sed -i 's/role: {/role: {\n        allowNull: false,\n        defaultValue: '\''guest'\'',/g' migrations/*-create-user.js

# Review Constraints
sed -i 's/apartmentId: {/apartmentId: {\n        allowNull: false,/g' migrations/*-create-review.js
sed -i 's/userId: {/userId: {\n        allowNull: false,/g' migrations/*-create-review.js
sed -i 's/rating: {/rating: {\n        allowNull: false,\n        defaultValue: 5,/g' migrations/*-create-review.js

# Reservation Constraints
sed -i 's/apartmentId: {/apartmentId: {\n        allowNull: false,/g' migrations/*-create-reservation.js
sed -i 's/userId: {/userId: {\n        allowNull: false,/g' migrations/*-create-reservation.js
sed -i 's/guestName: {/guestName: {\n        allowNull: false,/g' migrations/*-create-reservation.js
sed -i 's/checkIn: {/checkIn: {\n        allowNull: false,/g' migrations/*-create-reservation.js
sed -i 's/checkOut: {/checkOut: {\n        allowNull: false,/g' migrations/*-create-reservation.js

# 🔗 6. Inject Associations into Node.js Models
echo "Injecting model associations..."
sed -i 's/static associate(models) {/static associate(models) {\n      Apartment.hasMany(models.Review, { foreignKey: '\''apartmentId'\'' });\n      Apartment.hasMany(models.Reservation, { foreignKey: '\''apartmentId'\'' });/g' models/apartment.js
sed -i 's/static associate(models) {/static associate(models) {\n      User.hasMany(models.Review, { foreignKey: '\''userId'\'' });\n      User.hasMany(models.Reservation, { foreignKey: '\''userId'\'' });/g' models/user.js
sed -i 's/static associate(models) {/static associate(models) {\n      Review.belongsTo(models.Apartment, { foreignKey: '\''apartmentId'\'', onDelete: '\''CASCADE'\'' });\n      Review.belongsTo(models.User, { foreignKey: '\''userId'\'', onDelete: '\''CASCADE'\'' });/g' models/review.js
sed -i 's/static associate(models) {/static associate(models) {\n      Reservation.belongsTo(models.Apartment, { foreignKey: '\''apartmentId'\'', onDelete: '\''CASCADE'\'' });\n      Reservation.belongsTo(models.User, { foreignKey: '\''userId'\'', onDelete: '\''CASCADE'\'' });/g' models/reservation.js

# 🛡️ 7. Create a migration for Database Foreign Key Constraints
echo "Waiting to generate unique future timestamp..."
sleep 2
TIMESTAMP=$(date -d "+1 minute" +%Y%m%d%H%M%S 2>/dev/null || date -v+1m +%Y%m%d%H%M%S)

echo "Creating database relations migration at timestamp: ${TIMESTAMP}..."
cat << 'EOF' > "migrations/${TIMESTAMP}-add-database-relations.js"
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Apartment Constraints
    await queryInterface.addConstraint('Reviews', {
      fields: ['apartmentId'],
      type: 'foreign key',
      name: 'fkey_reviews_apartment',
      references: { table: 'Apartments', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('Reservations', {
      fields: ['apartmentId'],
      type: 'foreign key',
      name: 'fkey_reservations_apartment',
      references: { table: 'Apartments', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // User Constraints
    await queryInterface.addConstraint('Reviews', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fkey_reviews_user',
      references: { table: 'Users', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('Reservations', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fkey_reservations_user',
      references: { table: 'Users', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Reviews', 'fkey_reviews_apartment');
    await queryInterface.removeConstraint('Reservations', 'fkey_reservations_apartment');
    await queryInterface.removeConstraint('Reviews', 'fkey_reviews_user');
    await queryInterface.removeConstraint('Reservations', 'fkey_reservations_user');
  }
};
EOF

# 7. Generate Seeder
echo "Creating seeders..."

cat << 'EOF' > "seeders/${TIMESTAMP}-demo-users.js"
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'johnpap26',
        password: 'admin',
        firstName: 'John',
        lastName: 'Papadimitriou',
        email: 'johnpap26@gmail.com',
        phone: '6983505842',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'jimpap828',
        password: 'guest',
        firstName: 'Jimmy',
        lastName: 'Papadimitriou',
        email: 'jimpap828@gmail.com',
        phone: '6937410742',
        role: 'guest',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
EOF

cat << 'EOF' > "seeders/${TIMESTAMP}-demo-apartments.js"
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Apartments', [
      {
        title: 'My House Apartment JP 1',
        description: 'Modern apartment in Athens.',
        pricePerNight: 74,
        location: 'Ampelokoipoi, Athens, Greece',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'My House Apartment JP 2',
        description: 'Comfortable apartment in Athens.',
        pricePerNight: 82,
        location: 'Ampelokoipoi, Athens, Greece',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Apartments', null, {});
  }
};
EOF
echo "Generating seeders..."

npx sequelize-cli seed:generate --name demo-users
npx sequelize-cli seed:generate --name demo-apartments

echo "Running migrations..." 
npx sequelize-cli db:migrate

echo "🚀 Setup completed automatically with ALL associations & constraints!"