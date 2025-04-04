import pool from "../services/db.js"
import bcrypt from "bcrypt"


const checkUserExist = `
select * from users where email = $1
`

const insertUser = `
Insert into users(username, email, password) values ($1, $2, $3)  RETURNING id;
`

// User Registration
export const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    // console.log(name, email, password)
    try {
        // Check if the user already exists

        let user = await pool.query(checkUserExist, [email]);
        if (user.rows.length > 0) {
            return res.status(400).json({
                message: 'User already exists',
                success: false
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // Create new user
        await pool.query(insertUser, [name, email, hashedPassword])
       
        
        res.status(201).json({
            message: "User Created Successfully",
            user: {
                name,
                email,
            },
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false
        });
    }
};


