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

npm i axios

//psql
sudo apt update
sudo apt install postgresql-client -y
which psql -> /usr/bin/psql

SELECT * FROM "Apartments";
\d "Reservations"

  sudo apt install tmux
//convert json to better form json
  sudo apt install jq -y

//dont forget to convert CRLF to LF
.gitattributes

* text=auto eol=lf

*.sh text eol=lf
*.js text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.json text eol=lf

git add --renormalize .

//add to vscode files (open user settings json)
"files.eol": "\n"

//docker for local db and network
  download docker desktop
  https://www.docker.com/products/docker-desktop/

//enable wsl integration in docker desktop settings

//see dockers by using command ps
  docker ps

//create permanent (volume) docker data folder
  docker volume inspect jp_pgdata

  docker volume inspect jp_pgdata
//create postgres container from postgres image downloaded from dd
docker run --name jp-postgres \
  -e POSTGRES_USER=jp \
  -e POSTGRES_PASSWORD=pass \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -v jp_pgdata:/var/lib/postgresql \
  -d postgres:latest

docker exec -it jp-postgres psql -U jp -d postgres
\l

ls /var/lib/postgresql/18/docker

find /usr -name psql 2>/dev/null

echo 'export PATH=$PATH:/usr/lib/postgresql/16/bin' >> ~/.bashrc
source ~/.bashrc

// restore old files (env) from old commits
git show 57638c2:backend
git diff 57638c2 -- name-only backend/*env
git diff 57638c2 -- backend
git diff 57638c2 -- name-only backend/*env
git restore --source COMMIT_HASH backend/.env


### environment
environment =
| local (frontend + backend + db -> docker)
| dev ((frontend + backend) -> azure VM + db -> neondb)
| prod (frontend + backend + db -> neondb) -> docker 

backend/config/env.js
  NODE_ENV(something) = env.smth

  npm install -g cloudinary-cli
  export CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
  CLOUDINARY_CLOUD_NAME=dlwmf6upk
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
cld uploader upload ./photo.jpg
cld uploader upload ./photo.jpg --folder apartments/jp-1
