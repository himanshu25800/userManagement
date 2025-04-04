import jwt from "jsonwebtoken"


const checkUserExist = `
select * from users where email = $1
`

export const passwordResetTokenExists = async (req , res , next) => {
    
    try {
        const token = req.cookies.passwordResetToken;
        // console.log(token)
        if(!token){
            return res.status(401).json({
                message : "Unauthorized",
                success : false
            })
        }
        const decode = await jwt.verify(token , process.env.JWT_SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message : "Invalid Token",
                success : false
            })
        };
        // console.log(decode.email)
        req.canChangepassword = decode.can
        req.email = decode.email
        next();

    } catch (error) {
        console.log("Authenticate error",error)
        return res.status(401).json({
            message: "Invalid Token",
            success: false,
        });
    }
}