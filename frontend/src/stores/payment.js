import {defineStore} from "pinia"
import {ref} from 'vue'
import axios from 'axios'
import { useRouter } from "vue-router"


export const usePaymentStore = defineStore('payment', ()=>{
    const amount = ref(null)
    const currency = ref('INR')
    const receipt = ref('')
    const orderId = ref('')
    const router = useRouter()

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        
        return result;
      }

    const createOrder = async () => {
        
        try {
            const response = await axios.post('/create-order', {
                amount: amount.value,
                currency: currency.value,
                receipt: receipt.value,
            });
            orderId.value = response.data.id;
            console.log(response.data);
        } catch (error) {
            console.error('Error creating order:', error);
            
        } finally {
            
        }
    };

    const storePaymentDetails = async (amount,paymentId, status, bookId, details = null, paymentType = '') => {
        try {
            await axios.post('/store-payment-details', {
                paymentId,
                amount,
                status,
                details,
                bookId,
                paymentType
               
            });
        } catch (error) {
            console.error('Error storing payment details:', error);
            
        }
    };

    const decrementStock = async(bikeId)=>{
        try{
            const response  = await axios.put(`/decrement-stock/${bikeId}`)
            
        }catch(err){
            console.log(err)
        }
    }

    const payNow = async (amountValue, bookId, bikeId) => {
        amount.value = amountValue
        console.log("bookin id: ", bookId)
        receipt.value = 'receipt#' + generateRandomString(5);
        await createOrder();
        const options = {
            key: 'rzp_test_daoLopIZNUyaRK',
            amount: amountValue * 100,
            currency: currency.value,
            name: 'Bike Easy',
            description: 'Test Transaction',
            order_id: orderId.value,
            handler: async (response) => {

                console.log("Payment successful, handler triggered");
                try {

                    const verificationResponse = await axios.post('/verify-payment', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });


                    const paymentDetails = await axios.get(`/payment-details/${response.razorpay_payment_id}`);
                    const paymentType = paymentDetails.data.method;


                    await storePaymentDetails(amountValue,response.razorpay_payment_id, 'success',bookId, verificationResponse.data, paymentType);
                  
                    
                    router.push('/')
                    
                    alert("Payment Successful");
                    await decrementStock(bikeId)
                } catch (error) {
                    console.error( error);


                    await storePaymentDetails(amountValue,response.razorpay_payment_id, 'failure', bookId);
                    
                    alert("Payment Failed");
                   
                    
                }
            },
            modal: {
                ondismiss: async () => {
                    
                    await storePaymentDetails(amountValue,response.razorpay_payment_id, 'failure', bookId);
                    
                }
            },
            prefill: {
                name: 'Tokbi',
                email: 'tokbi@gmail.com',
                contact: '9999999999'
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#016dbc',
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    };

    return {payNow}

})