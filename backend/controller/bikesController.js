import pool from "../config/db.js";
import axios from 'axios'





export const getBikesID = async (req, res) => {
    console.log("from bike id", req.params.id)
    try {
        const getBikeID = await pool.query(
            "SELECT * FROM bikes, brands WHERE bike_id=$1 AND bikes.brand_id = brands.brand_id", [req.params.id])
        if (!getBikeID) {
            return res.json({ message: 'cannot get bikeID' })
        }
        console.log(getBikeID.rows)
        res.json(getBikeID.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }

}

export const decrementStock = async (req, res) => {
    try {
        console.log("STOCKSKSKS")
      const { bikeId } = req.params;
      const findBike = await pool.query('SELECT stocks FROM bikes WHERE bike_id = $1', [bikeId]);
  
      if (findBike.rows.length === 0) {
        return res.status(404).json({ error: 'Bike not found' });
      }

      const currentStock = findBike.rows[0].stocks;
  
      if (currentStock <= 0) {
        return res.status(400).json({ error: 'No stock available to decrement' });
      }
  
      const updatedStock = currentStock - 1;
  
      await pool.query('UPDATE bikes SET stocks = $1 WHERE bike_id = $2', [updatedStock, bikeId]);
  
      res.status(200).json({ message: 'Stock updated successfully', updatedStock });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update stock' });
    }
  };
  


export const getbikes = async (req, res) => {
    console.log("hey its working")
    try {
        const getBike = await pool.query(
            "SELECT * FROM bikes, brands where bikes.brand_id = brands.brand_id")
        

        res.json(getBike.rows)
    } catch (err) {
        res.json(err)
    }

}
export const getbikesbyBrand = async (req, res) => {
    const {brandId}=req.params
    console.log("brand id", brandId)
    console.log("hey its working")
    try {
        const getBike = await pool.query(
            "SELECT * FROM bikes WHERE brand_id =$1",[brandId])
        if (!getBike) {
            return res.json({ message: 'cannot get bike' })
        }

        res.json(getBike.rows)
    } catch (err) {
        res.status(500).json({ err })
    }

}


export async function deleteBike(req, res) {

    const data = req.params
    try {
        const delAdmin = await pool.query(
            "DELETE FROM bikes WHERE bike_id=$1", [data.id])
        
        res.json(delAdmin.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}
export async function addBike(req, res) {
    const data = req.body
    try {


        const newAdmin = await pool.query(
            "INSERT INTO bikes(name, modelname ) VALUES ($1, $2)", [data.name, data.model])

        if (!newAdmin) {
            return res.json({ message: 'cannot insert' })
        }

        res.json(newAdmin)

    } catch (err) {
        res.status(500).json({ err })

    }

}
export const insertBikes = async (req, res) => {
    try {
      console.log("bikeimg: ", req.file);  // Should now log the file object if it's correctly uploaded.
  
      const { bikeId, modelName, brand, price, horsepower, torque, seatHeight, stocks } = req.body;
      
      // Handle image file, check if it's uploaded
      const image = req.file ? req.file.filename : null;
      if (!image) {
        return res.status(400).json({ error: "Image file is required" });
      }
  
      const data = [
        brand,
        modelName,
        price,
        horsepower,
        torque,
        seatHeight,
        `/uploads/${image}`, 
        stocks,
      ];
  
      
      const insert = await pool.query(
        "INSERT INTO bikes(brand_id, model_name, price, horsepower, torque, seatheight, img_path, stocks) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
        data
      );
  
      res.status(201).json(insert);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to insert bike" });
    }
  };
  
export const mount=async(req,res)=>{
    const bikes=ref([])
const selectbikevalue=ref(null)
    try{
        res=await axios.get()
        bike.value=res.data
        selectbikevalue=bikes.value[0]
    }catch(err){
        console.log('errer')
    }
}