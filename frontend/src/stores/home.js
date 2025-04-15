import {defineStore} from "pinia"
import {ref} from 'vue'
import axios from 'axios'
import { useRouter } from "vue-router"

export const useHomeStore = defineStore('home', ()=>{
    const router = useRouter()
    const brands = ref([])
    const bikes = ref([])
    const selectedBike = ref({});
    const booking = ref({})
    const BookingData = ref({
        name: '',
        address: '',
        email: '',
        phone: '',
        bookingDate: ''

    })

    const form = ref({
        customerName: '',
        address: '',
        phoneNumber: '',
        email: '',
        bookingDate: '',
      });
      
      // Error state
      const errors = ref({
        customerName: '',
        address: '',
        phoneNumber: '',
        email: '',
        bookingDate: '',
      });

    const getBrands = async ()=>{
        try {
            console.log("HEHEHEHEH")
            const response = await axios.get('/brands');
            brands.value = response.data
            console.log("BRANDS: ", brands.value)

        } catch (error) {
            console.log(error)
        }
    }

    const getBikeByBrand = async(brandId)=>{
        try {
            const response = await axios.get(`/bikes/${brandId}`);
            bikes.value = response.data
            console.log("BIKESS: ", bikes.value)

        } catch (error) {
            console.log(error)
        }
    }
    const getBikeById = async(bikeId)=>{
        try{
            const response = await axios.get(`/bike/${bikeId}`)
            selectedBike.value = response.data
        }catch(err){
            console.log(err)
        }
    }

    const addCustomer = async(bikeId)=>{
        try{
           
            const response = await axios.post('/customer/add', {form: form.value, bikeId})
            const bookId = response.data
            

            router.push(`/CheckoutView/${bikeId}/${bookId}`)
            
        }catch(err){
            console.log(err)
        }
    }

    const getBookingById = async(bookId)=>{
        try{
            const response = await axios.get(`/booking/${bookId}`)
            booking.value = response.data

        }catch(err){
            console.log(err)
        }
    }





    return {getBookingById, booking,addCustomer, getBikeById, brands, form, errors, getBrands, bikes, getBikeByBrand, selectedBike, BookingData}
})