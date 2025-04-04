import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();


// Configure email transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,     //"himanshutest11150@gmail.com", // Replace with your email
        pass: process.env.EMAIL_PASSWORD    //"sbda unvu hcrk oddd"  // Replace with your email password or app password
    }
});

// Function to send OTP via email
export const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from:  process.env.EMAIL_USER, //"himanshutest11150@gmail.com",
        to: email,
        subject: "Your OTP for Email Verification",
        text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP sent to:", email);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
