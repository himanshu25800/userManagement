import pool from "../services/db.js";
import bcrypt from "bcrypt"
import { deleteOtp } from "../utils/delete-otp.js";
import { verifyOtp } from "../utils/verify-otp.js";
import jwt from "jsonwebtoken";



export const genPasswordToken = async (req, res, next) => {
    const {email, otp} =  req.body;
    console.log("Incoming data:", email, otp);

    try {
        let result = await verifyOtp(email,otp)
        console.log("OTP verification result:", result);


        if (result){
            await deleteOtp(email)
            const passwordResetToken = jwt.sign(
                { can:true, email:email}, 
                process.env.JWT_SECRET_KEY, // Replace with a secure secret key
                { expiresIn: "1h" } // Token expires in 1 hour
            );

            return res.status(200).cookie("passwordResetToken", passwordResetToken, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                secure : false
                }).json({
                message: 'Move to reset password',
                success: true,
                passwordResetToken
            })
        }else{
            return res.status(200).json({
                message: 'Invalid Otp',
                success: false,
        })
        } 
    }catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "server error",
            success: false,
        });
    }
}




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