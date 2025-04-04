import jwt from "jsonwebtoken"
import pool from "../services/db.js"


const checkUserExist = `
select * from users where email = $1
`

export const auth = async (req , res , next) => {
    
    try {
        const token = req.cookies.token;
        // console.log(token)
        if(!token){
            return res.status(401).json({
                message : "User not login in",
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
        req.user = await pool.query(checkUserExist, [decode.email]);
        req.user = req.user.rows[0]
        if(!req.user) {
            return res.status(401).json({
                message : "User not Found",
                success : false
            })
        }
        // console.log(req.user)
        next();

    } catch (error) {
        console.log("Authenticate error",error)
        return res.status(401).json({
            message: "Invalid Token",
            success: false,
        });
    }
}