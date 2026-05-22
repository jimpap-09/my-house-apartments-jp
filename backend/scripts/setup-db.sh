#!/bin/bash
set -e

export NODE_ENV=${NODE_ENV:-development}
echo "NODE_ENV=$NODE_ENV"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE}")" && pwd)"
cd "$SCRIPT_DIR/.."

echo "Current directory is now: $(pwd)"

echo "Cleaning existing Sequelize files..."
rm -rf models migrations conf/config* seeders .sequelizerc
rm -f config/config.json config/config.js

echo "Installing packages..."
npm install sequelize pg pg-hstore dotenv
npm install -D sequelize-cli

echo "Initializing sequelize..."
npx sequelize-cli init --force

echo "Replacing config.json with config.js..."
rm -f config/config.json

cat << 'EOF' > config/config.js
require('./env')

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIALECT || 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIALECT || 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIALECT || 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  }
};
EOF

echo "Creating .sequelizerc..."
cat << 'EOF' > .sequelizerc
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js'),
  'models-path': path.resolve('models'),
  'seeders-path': path.resolve('seeders'),
  'migrations-path': path.resolve('migrations')
};
EOF

echo "Updating models/index.js to use config.js..."
sed -i "s|../config/config.json|../config/config.js|g" models/index.js
sed -i "s|/../config/config.json|/../config/config.js|g" models/index.js

echo "Generating models & migrations..."
npx sequelize-cli model:generate --name Apartment --attributes title:string,description:text,pricePerNight:float,location:string
npx sequelize-cli model:generate --name User --attributes username:string,password:string,firstName:string,lastName:string,email:string,phone:string,role:string
npx sequelize-cli model:generate --name Review --attributes apartmentId:integer,userId:integer,rating:integer,comment:text
npx sequelize-cli model:generate --name Reservation --attributes apartmentId:integer,userId:integer,guestName:string,checkIn:date,checkOut:date

echo "Applying constraints..."
sed -i 's/title: {/title: {\n        allowNull: false,/g' migrations/*-create-apartment.js
sed -i 's/location: {/location: {\n        allowNull: false,/g' migrations/*-create-apartment.js
sed -i 's/pricePerNight: {/pricePerNight: {\n        allowNull: false,\n        defaultValue: 0,/g' migrations/*-create-apartment.js

sed -i 's/username: {/username: {\n        allowNull: true,/g' migrations/*-create-user.js
sed -i 's/password: {/password: {\n        allowNull: true,/g' migrations/*-create-user.js
sed -i 's/firstName: {/firstName: {\n        allowNull: false,/g' migrations/*-create-user.js
sed -i 's/lastName: {/lastName: {\n        allowNull: false,/g' migrations/*-create-user.js
sed -i 's/email: {/email: {\n        allowNull: false,\n        unique: true,/g' migrations/*-create-user.js
sed -i 's/phone: {/phone: {\n        allowNull: false,\n        unique: true,/g' migrations/*-create-user.js
sed -i 's/role: {/role: {\n        allowNull: false,\n        defaultValue: '\''guest'\'',/g' migrations/*-create-user.js

sed -i 's/apartmentId: {/apartmentId: {\n        allowNull: false,/g' migrations/*-create-review.js
sed -i 's/userId: {/userId: {\n        allowNull: false,/g' migrations/*-create-review.js
sed -i 's/rating: {/rating: {\n        allowNull: false,\n        defaultValue: 5,/g' migrations/*-create-review.js

sed -i 's/apartmentId: {/apartmentId: {\n        allowNull: false,/g' migrations/*-create-reservation.js
sed -i 's/userId: {/userId: {\n        allowNull: false,/g' migrations/*-create-reservation.js
sed -i 's/guestName: {/guestName: {\n        allowNull: false,/g' migrations/*-create-reservation.js
sed -i 's/checkIn: {/checkIn: {\n        allowNull: false,/g' migrations/*-create-reservation.js
sed -i 's/checkOut: {/checkOut: {\n        allowNull: false,/g' migrations/*-create-reservation.js

echo "Injecting model associations..."
sed -i 's/static associate(models) {/static associate(models) {\n      Apartment.hasMany(models.Review, { foreignKey: '\''apartmentId'\'' });\n      Apartment.hasMany(models.Reservation, { foreignKey: '\''apartmentId'\'' });/g' models/apartment.js

sed -i 's/static associate(models) {/static associate(models) {\n      User.hasMany(models.Review, { foreignKey: '\''userId'\'' });\n      User.hasMany(models.Reservation, { foreignKey: '\''userId'\'' });/g' models/user.js

sed -i 's/static associate(models) {/static associate(models) {\n      Review.belongsTo(models.Apartment, { foreignKey: '\''apartmentId'\'', onDelete: '\''CASCADE'\'' });\n      Review.belongsTo(models.User, { foreignKey: '\''userId'\'', onDelete: '\''CASCADE'\'' });/g' models/review.js

sed -i 's/static associate(models) {/static associate(models) {\n      Reservation.belongsTo(models.Apartment, { foreignKey: '\''apartmentId'\'', onDelete: '\''CASCADE'\'' });\n      Reservation.belongsTo(models.User, { foreignKey: '\''userId'\'', onDelete: '\''CASCADE'\'' });/g' models/reservation.js

echo "Creating database relations migration..."
sleep 2
TIMESTAMP=$(date -d "+1 minute" +%Y%m%d%H%M%S 2>/dev/null || date -v+1m +%Y%m%d%H%M%S)

cat << 'EOF' > "migrations/${TIMESTAMP}-add-database-relations.js"
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
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

echo "Generating users seeder..."
npx sequelize-cli seed:generate --name demo-users

USERS_SEED=$(ls -t seeders/*demo-users.js | head -n 1)

cat << 'EOF' > "$USERS_SEED"
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

echo "Generating apartments seeder..."
npx sequelize-cli seed:generate --name demo-apartments

APARTMENTS_SEED=$(ls -t seeders/*demo-apartments.js | head -n 1)

cat << 'EOF' > "$APARTMENTS_SEED"
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

echo "Running migrations..."
npx sequelize-cli db:migrate

echo "Running seeders..."
npx sequelize-cli db:seed:all

echo "🚀 Setup completed successfully!"