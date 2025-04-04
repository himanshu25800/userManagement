import pool from "../services/db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const checkUserExist = `
select * from users where email = $1
`

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    // console.log(email,password)

    let user = await pool.query(checkUserExist,[email])

    // console.log(user.rows)
    if (user.rows.length > 0){
        let dbPassword = user.rows[0]['password']
        // console.log(dbPassword)
        
        // Check if password matches using bcrypt
        const isMatch = await bcrypt.compare(password, dbPassword);
        if(isMatch){
            const token = jwt.sign(
                { userId: user.rows[0].id, email: user.rows[0].email }, 
                process.env.JWT_SECRET_KEY, // Replace with a secure secret key
                { expiresIn: "1h" } // Token expires in 1 hour
            );

            return res.status(200).cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'lax',//'none',
                secure : false
              }).json({
                message: 'User loged in Successfully',
                success: true,
                token
            })
        }else{
            return res.status(400).json({
                message: 'wrong password',
                success: false
            })
        }
    }

    return res.status(400).json({
        message: 'User not exists',
        success: false
      });
}