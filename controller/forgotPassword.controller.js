import pool from "../services/db.js";
import bcrypt from "bcrypt"


const checkUserExist = `
select * from users where email = $1
`

const updatePasswordQuery = `
UPDATE users SET password = $1 WHERE email = $2;
`

export const resetPassword = async (req, res) => {
    const {newPassword} = req.body;
    const email = req.email
    try {
        let user = await pool.query(checkUserExist,[email])
        if(user.rows.length <= 0){
            return res.status(201).json({
                message: 'sorry user not exists',
                success: false
            })
        }
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(newPassword,salt)
        await pool.query(updatePasswordQuery,[hashedPassword, email])
        return res.status(201).json({
            message: 'Password updated successfully',
            success: true
        })
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "server error",
            success: false,
        });
    }
}