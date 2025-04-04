import pool from "../services/db.js";


// Delete OTP after successful verification
export const deleteOtp = async (email) => {
    const query = `DELETE FROM user_otps WHERE email = $1`;
    try {
        await pool.query(query, [email]);
    } catch (error) {
        throw error;
    }
};
