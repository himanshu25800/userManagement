import { delete_otp } from "../utils/delete-otp.js";
import { verify_otp } from "../utils/verify-otp.js";
import jwt from "jsonwebtoken";

export const genPasswordToken = async (req, res, next) => {
    const {email, otp} =  req.body;
    console.log("Incoming data:", email, otp);

    try {
        let result = await verify_otp(email,otp)
        console.log("OTP verification result:", result);


        if (result){
            await delete_otp(email)
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