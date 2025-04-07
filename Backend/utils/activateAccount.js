import pool from "../services/db.js";


export const accountActive = async (email) => {
    const query = `UPDATE users SET isVerified = TRUE WHERE email = $1;`;
    try {
        await pool.query(query, [email]);
        console.log("Updating users table")
    } catch (error) {
        throw error;
    }
}