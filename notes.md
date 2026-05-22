# 🚀 Sequelize Migration & Seeder Commands

Useful commands for managing the database schema and seed data in the backend.

### 📂 Navigation
```bash
cd backend
```

### 🛠️ Migrations
* **Generate a new migration:**
  ```bash
  npx sequelize-cli migration:generate --name merge-rating-into-reviews
  ```
* **Run all pending migrations:**
  ```bash
  npx sequelize-cli db:migrate
  ```
* **Run a specific migration:**
  ```bash
  npx sequelize-cli db:migrate --name 20260521073328-merge-rating-into-reviews.js
  ```
* **Undo the last migration:**
  ```bash
  npx sequelize-cli db:migrate:undo
  ```
* **Undo a specific migration file:**
  ```bash
  npx sequelize-cli db:migrate:undo --name 20260521073328-merge-rating-into-reviews.js
* **See all migrations that have done**
  npx sequelize-cli db:migrate:status
  ```

### 🌿 Seeders
* **Generate a new seeder:**
  ```bash
  npx sequelize-cli seed:generate --name real-apartments
  ```
* **Run all seeders:**
  ```bash
  npx sequelize-cli db:seed:all
  ```
* **Run a specific seeder file:**
  ```bash
  npx sequelize-cli db:seed --seed FILE_NAME.js
  ```
### Searching methods
grep -R "dotenv" backend --exclude-dir=node_modules

### Debugging methods -- Console Out something specific
NODE_ENV=development node -e "require('./config/env'); console.log(process.env.DB_DIALECT)"