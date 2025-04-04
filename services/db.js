// services/db.js
import pkg from 'pg';
const { Pool } = pkg;


// Configure the PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',             // Your PostgreSQL username
  host: 'localhost',            // PostgreSQL host
  database: 'usermanagement',  // Your database name
  password: 'thinksys@123', // Your database password
  port: 5432,                   // PostgreSQL default port
});

export default pool;
