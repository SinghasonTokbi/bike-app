import pool from "../config/db.js";
import cron from 'node-cron'
const current = Date()
console.log(current)
export const getbooking = async (req, res) => {
    console.log("hey its working")
    try {
        const getbook = await pool.query(
            "SELECT * FROM booking")
        if (!getbook) {
            return res.json({ message: 'cannot get bike' })
        }

        res.json(getbook.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }

}
cron.schedule('*/60 * * * *', async () => {
    try {
        const getbook = await pool.query(
            "UPDATE booking SET status='expire' WHERE booking_dt > $1", [current])
        const count = getbook.rowCount

        const getslots = await pool.query(
            "SELECT * FROM limitbook"
        )
        const slots = getslots.rows[0]
        if (count && slots <= 10) {
            for (let i = 0; i < count; i++) {
                slots++
                const updatebook = await pool.query(
                    "UPDATE limitbook SET limits=$1", [slots]
                )
            }
        }
    } catch (err) { }
})

export const getBookingById = async(req, res)=>{
    try{
        const {bookId} = req.params

        const book = await pool.query("select * from cust_booking where cust_id = $1 limit 1", [bookId])

        res.json(book.rows[0])

    }catch(err){
        console.log(err)
        res.json(err)
    }
}

export const insertbooking = async (req, res) => {
    try {
        const insertbook = await pool.query(
            "INSERT INTO booking(brandname,brandmodel,book_dt,amount")
    } catch (err) { }
}