import pool from "../config/db.js";
export const insertUsersInfo = async (req, res) => {
    try {
        const userinfo = await pool.query(
            "INSERT INTO customers (name, phoneno, address) VALUES ($1, $2, $3)",

        );
        res.json(userinfo)
    } catch (err) { }
}

export const insertCustomer = async (req, res) => {
    try {
      const { form, bikeId } = req.body;
      console.log("received: ", form);
  
      const insert = await pool.query(
        "INSERT INTO cust_booking (cname, address, phoneno, email, book_dt, status, bike_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING cust_id",
        [
          form.customerName,
          form.address,
          form.phoneNumber,
          form.email,
          form.bookingDate,
          'inactive',
          bikeId,
        ]
      );
  
      const insertedId = insert.rows[0].cust_id; 
      res.json( insertedId ); 
    } catch (err) {
      console.error("Error inserting customer: ", err);
      res.status(500).json({ success: false, message: "Error inserting customer" });
    }
  };

  export const deleteCustomer = async(req, res)=>{
    try{
      const {id} = req.params;
      console.log("delete customers: ", id)
      const del = pool.query("delete from cust_booking where cust_id=$1", [id])
      res.json(del)
    }catch(err){
      console.log(err)
      res.json(err)
    }
  }

  export const getCustomers = async (req, res)=>{
    try{
      console.log("CUSROMEWRSS")
      const customers = await pool.query("select * from cust_booking")

      
      
      res.json(customers.rows)
    }catch(err){
      console.log(err)
      res.json(err)
    }
  }
  