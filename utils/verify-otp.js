import pool from "../services/db.js";

// Verify OTP
export const verify_otp = async (email, otp) => {
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