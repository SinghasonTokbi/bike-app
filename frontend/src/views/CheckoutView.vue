<script setup>
import {  computed } from "vue";
import {ref, onMounted} from 'vue'
import { storeToRefs } from 'pinia';
import { useHomeStore } from '@/stores/home';
import { usePaymentStore } from "@/stores/payment";

const home = useHomeStore()
const payment = usePaymentStore()

const {payNow} = payment

const {bikes,booking, selectedBike} = storeToRefs(home)
const { getBikeById, getBookingById} = home
// Bike price
const bikePrice = 187000;

const bookingAmount = computed(() => (bikePrice * 1.7) / 100);
const api = import.meta.env.VITE_API
const props = defineProps({
  bikeId: {type: String, required: true},
  bookId:{type: String, required: true},
})

const calculate = (amount)=>{
  return (amount * 1.7) / 100
}

onMounted(()=>{
  getBikeById(Number(props.bikeId))
  // getBookingById(Number(props.bookId))
  // console.log(selectedBike.value)
  // const bikePrice = selectedBike.value[0].price;
  // const bookingAmount = computed(() => (bikePrice * 1.7) / 100);
  
})

</script>

<template>
  <div class="container" v-if="selectedBike.length > 0">
    <!-- Bike Details -->
     
    <div class="bike-details">
      <img alt="Hunter 350" :src="`${api}${selectedBike[0].img_path}`" />
      
     
      <div class="details">
        <p><strong>Model Name:</strong> {{selectedBike[0].model_name}}</p>
        <p><strong>Brand:</strong> {{selectedBike[0].brand_name}}</p>
        <p><strong>Price (₹):</strong> {{selectedBike[0].price}}</p>
        <p><strong>Horsepower:</strong> {{selectedBike[0].horsepower}}</p>
        <p><strong>Torque:</strong> {{selectedBike[0].torque}}</p>
        <p><strong>Seat Height:</strong>  {{selectedBike[0].seatheight}}</p>
        <p><strong>Stocks:</strong>  {{selectedBike[0].stocks}}</p>
      </div>
    </div>

    <!-- Check-out Section -->
    <div class="check-out">
      <label for="Booking-Amount">Booking Amount</label>
      <!-- Display the calculated booking amount -->
      <input
        type="text"
        id="number"
        :value="calculate(selectedBike[0].price).toFixed(2)"
        disabled
        placeholder="Booking amount"
      />

      <button type="submit" class="proceed" @click="payNow(calculate(selectedBike[0].price).toFixed(2), Number(props.bookId), selectedBike[0].bike_id)">Pay and Book</button>
    </div>
  </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center content vertically */
    align-items: center; /* Center content horizontally */
    gap: 20px;
    width: 90%; /* Ensure it fits within the screen */
    max-width: 700px;
    margin: auto; /* Center the container itself */
    height: 100vh; /* Fill the viewport height */
  }
  .bike-details{
    display: flex;
    justify-content: space-between
}
  
  .bike-details,
  .check-out {
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 700px;
    margin-top: 10px;
  }
  
  .bike-details img {
    width: 100%;
    max-width: 300px;
    display: block;
    background-color:white;
    align-items: right;
    object-fit: contain;
  }
  
  .details {
    background-color:white;
    display: flex;
    flex-direction: column;
  }
  
  .details p {
    margin: 5px 0;
  }
  
  .check-out label {
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
  }
  
  .check-out input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .proceed {
    background-color: #ff4d4d;
    color: white;
    border: none;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .proceed:hover {
    background-color: green;
    transform: translateY(-2px);
  }
</style>



