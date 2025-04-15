import pool from "../config/db.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";



export const hello = async (req, res) => {


    try {
        console.log("heheheh")
        const result = await pool.query("SELECT * FROM test");
        console.log(result[0])
        res.json(result.rows);
    } catch (err) {
        console.log("errorororo")
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching the user." });
    }
};


export const decodeToken = async (req, res) => {
    try {
        console.log("DECODE")
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

       
        res.json({
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
        });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const adminLogin = async (req, res) => {
    try {
        console.log("ADMIN LOGIN")
        const { email, password } = req.body;

        
        const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Admin not found" });
        }

        const admin = result.rows[0];

        
        const passwordMatch = await bcrypt.compare(password, admin.passwords);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        
        const token = jwt.sign(
            { id: admin.admin_id, username: admin.username, email: admin.email }, 
            process.env.JWT_SECRET                
        );

        res.json(token);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred during login" });
    }
};

export async function insertadmin(req, res) {
    try {
        const { username, email, password, conPassword } = req.body;

        if (password !== conPassword) {
            return res.json({ message: 'password not matchin' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newAdmin = await pool.query(
            "INSERT INTO admins (username, passwords, email) VALUES ($1, $2, $3)",
            [username, hashedPassword, email]
        );
        res.json(newAdmin.rows)
    } catch (err) {
        console.log(err)
        res.json(err)
    }



}

export async function insertadminManual(username, email, password, conPassword) {
    try {
        

        if (password !== conPassword) {
            return res.json({ message: 'password not matchin' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newAdmin = await pool.query(
            "INSERT INTO admins (username, passwords, email) VALUES ($1, $2, $3)",
            [username, hashedPassword, email]
        );
        console.log('succ')
    } catch (err) {
        console.log(err)
    }



}


