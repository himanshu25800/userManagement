-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(100) UNIQUE NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   isVerified bool DEFAULT False,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE users (
  id SERIAL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) PRIMARY KEY,
  isVerified bool DEFAULT False,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);