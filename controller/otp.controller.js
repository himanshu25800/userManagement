// import {verifyOtp, accountActive} from "./email.controller.js"
import { verifyOtp } from "../utils/verify-otp.js"
import {accountActive } from "../utils/activateAccount.js"
import {generateOtp} from "../utils/generateOtp.js"
import { storeOtp } from "../utils/storeOtp.js"
import { deleteOtp } from "../utils/delete-otp.js"
import {sendOtpEmail} from "../services/email.js"

export const sendOtp  = async (req, res) => {
    // Generate OTP
    const otp = generateOtp();

    // let user_id = req.user['id']
    let email = req.user['email']
    // Store OTP in database
    await storeOtp(email, otp);

    // Send OTP to user's email
    await sendOtpEmail(email, otp);

    res.status(201).json({
        "otp":otp
    })
}



export const requestOtp  = async (req, res) => {
    const {email} = req.body
    // Generate OTP
    const otp = generateOtp();

    // Store OTP in database
    await storeOtp(email, otp);

    // Send OTP to user's email
    await sendOtpEmail(email, otp);

    res.status(201).json({
        "otp":otp
    })
}





export const isOtpCorrect =  async (req, res) => {
    const { email, otp } = req.body;
    console.log(email, otp)
    try {
        // Verify OTP
        const isValid = await verifyOtp(email, otp);
       
        if (isValid) {
            console.log(isValid)
            await accountActive(email)
            await deleteOtp(email)
            res.status(200).json({
                message: "Email verified successfully!",
                success: true
            });
        } else {
            res.status(400).json({
                message: "Invalid or expired OTP",
                success: false
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error });
    }
}