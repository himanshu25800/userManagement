// services/db.js
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv"

dotenv.config()

// Configure the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,//'postgres',             // Your PostgreSQL username
  host: process.env.DB_HOST,//'localhost',            // PostgreSQL host
  database: process.env.DB_DATABASE,//'usermanagement',  // Your database name
  password: process.env.DB_PASSWORD,//'thinksys@123', // Your database password
  port: process.env.DB_PORT,  //5432,                   // PostgreSQL default port
});

export default pool;
