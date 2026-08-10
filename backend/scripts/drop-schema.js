const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config({
  path: "backend/.env",
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function resetDatabase() {
  try {
    console.log("Connecting to database...");

    await client.connect();

    console.log("Connected.");

    await client.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `);

    console.log("Database schema reset completed.");
  } catch (error) {
    console.error("Database reset failed:");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

resetDatabase();