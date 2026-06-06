from node:24-alpine
workdir /app
copy . .
run npm install --omit=dev
cmd ["node", "src/index.js"]
expose 3000