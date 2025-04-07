import pool from "../services/db.js";

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