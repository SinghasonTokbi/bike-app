import express from 'express'
import { decodeToken, hello, insertadmin } from '../controller/adminController.js'
import { adminLogin } from '../controller/adminController.js'
import { addBike, decrementStock, deleteBike, getbikes, getbikesbyBrand, getBikesID, insertBikes } from '../controller/bikesController.js'
import { getbrands } from '../controller/brandController.js'
import { getBookingById, getbooking } from '../controller/bookController.js'
import { getusers } from '../controller/userController.js'
import { createOrder, gettransaction, insertPayInfo, paymentDetails, verifyPayment } from '../controller/paymentController.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { deleteCustomer, getCustomers, insertCustomer, insertUsersInfo } from '../controller/customers.js'
import { contactinfo, deleteCustenquire, getContact, getinquire, insertcontact } from '../controller/contactUs.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const uploads = multer({
    storage: storage
})

const router = express.Router()
router.get('/bike/:id', getBikesID)
router.delete('/del-bike/:id', deleteBike)
router.post('/customer/add', insertCustomer )
router.get('/customers', getCustomers)
router.delete('/customer/:id', deleteCustomer)
router.get('/bikes', getbikes)
router.get('/bikes/:brandId', getbikesbyBrand)
router.get('/brands', getbrands)
router.get('/book', getbooking)
router.get('/booking/:bookId', getBookingById)
router.post('/admin', insertadmin)
router.put('/decrement-stock/:bikeId', decrementStock)
router.get('/customers', getusers)
router.get('/payment', gettransaction)
router.get('/contacts', getContact)
router.post('/add-brands', uploads.fields([
    { name: 'brandimgs', maxcount: 1 },

]))
router.post('/add-bikes', uploads.single('image'), insertBikes);

router.post('/userinfo', insertUsersInfo)
// router.post('/payinfo', insertPayInfo)
router.post('/login', insertadmin)
router.post('/getcontact-us',getinquire)
router.post('/contact-usInfo',contactinfo)
router.post('/book-contactus',insertcontact)
router.delete('/custenquire/:id',deleteCustenquire)
// payment
router.post('/create-order', createOrder)
router.post('/store-payment-details',  insertPayInfo)
router.post('/verify-payment', verifyPayment)
router.get('/payment-details/:id', paymentDetails)


// auth
router.post('/admin/login', adminLogin)
router.post('/admin/decode-token', decodeToken)


export default router