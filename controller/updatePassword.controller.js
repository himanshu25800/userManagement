
import pool from "../services/db.js";
import bcrypt from "bcrypt"


const updatePasswordQuery = `
UPDATE users SET password = $1 WHERE email = $2;
`

const checkUserExist = `
select * from users where email = $1
`

export const updatePassword = async (req, res) => {
    const {previousPassword, newPassword} = req.body;
    const email = req.user['email']
    // console.log(email)
    try {
        let user = await pool.query(checkUserExist,[email])
        
        let dbPassword = user.rows[0]['password']
        
        console.log("Entered Password:", previousPassword);
        console.log("Stored Hashed Password:", dbPassword);

        const isMatch = await bcrypt.compare(previousPassword.trim(), dbPassword.trim())
        console.log(isMatch)
        
        if(!isMatch){
            return res.status(400).json({
                message: 'wrong previous password',
                success: false
            })
        }else{
            let salt = await bcrypt.genSalt(10)
            let hashedPassword = await bcrypt.hash(newPassword,salt)
            await pool.query(updatePasswordQuery,[hashedPassword, email])
            return res.status(201).json({
                message: 'Password updated successfully',
                success: false
            })
        }

    } catch (error) {
        console.log(error)
    }
}