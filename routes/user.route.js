import e from "express";
import {signupUser}  from "../controller/signup.controller.js"
import  {loginUser} from "../controller/login.controller.js"
import { sendOtp, isOtpCorrect, requestOtp } from "../controller/otp.controller.js";
import { auth } from "../middleware/authToken.js";
import { updatePassword } from "../controller/updatePassword.controller.js";
import { passwordResetTokenExists } from "../middleware/passwordResetToken.js";
import { resetPassword, genPasswordToken } from "../controller/forgotPassword.controller.js";



const router = e.Router()

router.post('/signup',signupUser)
router.post('/login',loginUser)

// for email verification
router.get("/send-otp",auth, sendOtp);
router.post("/verify-otp",auth, isOtpCorrect);

router.post("/update-password",auth,updatePassword)

// to reset password
router.post("/request-otp",requestOtp)
router.post("/gen-password-token",genPasswordToken)
router.post("/change-password",passwordResetTokenExists,resetPassword)

export default router;
