import pool from "../services/db.js";

// Generate a random 6-digit OTP
export const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Store OTP in user_otps table
export const storeOtp = async (email, otp) => {
    const query = `
        INSERT INTO user_otps (email, otp, otp_expires_at)
        VALUES ($1, $2, NOW() + INTERVAL '5 minutes')
        ON CONFLICT (email) DO UPDATE 
        SET otp = EXCLUDED.otp, otp_expires_at = EXCLUDED.otp_expires_at;
    `;
    try {
        await pool.query(query, [email, otp]);
        return true;
    } catch (error) {
        throw error;
    }
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
    const query = `
        SELECT * FROM user_otps 
        WHERE email = $1 AND otp = $2 AND otp_expires_at > NOW();
    `;
    try {
        const result = await pool.query(query, [email, otp]);
        console.log(result.rows.length)
        return result.rows.length > 0;
    } catch (error) {
        throw error;
    }
};

// Delete OTP after successful verification
export const deleteOtp = async (email) => {
    const query = `DELETE FROM user_otps WHERE email = $1`;
    try {
        await pool.query(query, [email]);
    } catch (error) {
        throw error;
    }
};


export const accountActive = async (email) => {
    const query = `UPDATE users SET isVerified = TRUE WHERE email = $1;`;
    try {
        await pool.query(query, [email]);
        console.log("Updating users table")
    } catch (error) {
        throw error;
    }
}