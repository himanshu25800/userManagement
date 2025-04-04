CREATE TABLE user_otps (
    id SERIAL PRIMARY KEY,
    -- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    otp VARCHAR(6) NOT NULL,
    otp_expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
