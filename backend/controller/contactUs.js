
import pool from "../config/db.js";

import { DataTypes } from "sequelize";
// import { sequelize } from '../config/db.js';


export const getinquire = async (req, res) => {
    console.log("from contactus id", req.params.id)
    try {
        const getCid = await pool.query(
            "SELECT * FROM contactus")
        if (!getCid) {
            return res.json({ message: 'cannot get infoID' })
        }
        console.log(getCid.rows)
        res.json(getCid.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }

}
export const contactinfo=async(req, res) => {
    if (!firstname || !lastname || !phoneno || !email || !messages) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
    

const mailOptions = {
    from: email, // From user email
    to: 'shawn@gamil.com', // Replace with your email to receive the contact message
    subject: `Contact Us Message from ${firstname}`,
    text: `1Name: ${firstname}\n2Name:${lastname}\nphone:${phoneno}\nEmail: ${email}\nMessage: ${message}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    } else {
      return res.status(200).json({ message: 'Your message has been sent successfully!' });
    }
  });
};
export async function insertcontact(req, res) {
  try {
      const { firstname,lastname,phoneno,email,messages } = req.body;
      const newcontact = await pool.query(
        "INSERT INTO contactus(firstname, lastname, phoneno,email,messages) VALUES ($1, $2, $3,$4,$5)",[firstname,lastname,phoneno,email,messages])
        
      res.json( newcontact); 
        
    
   
} catch (err) {
    console.log(err)
    res.json(err)
}
}
export const deleteCustenquire = async(req, res)=>{
  try{
    const {id} = req.params;
    console.log("delete customers: ", id)
    const del =  await pool.query("delete from contactus where no_id=$1", [id])
    res.json(del)
  }catch(err){
    console.log(err)
    res.json(err)
  }
}

export const getContact = async(req, res)=>{
  try{
    const contacts = await  pool.query("select * from contactus")
    res.json(contacts.rows)
  }catch(err){
    console.log(err)
    res.json(err)
  }
}

// export const Inquiry =sequelize.define('Inquiry', {
//   firstname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   lastname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   phoneno:{
//     type:DataTypes.INTEGER,
//     allowNull:false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   message: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
 
// });

