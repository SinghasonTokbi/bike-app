<script setup>
import { RouterLink } from 'vue-router';
import {ref, onMounted} from 'vue'
import { storeToRefs } from 'pinia';
import { useHomeStore } from '@/stores/home';
import { useRouter } from 'vue-router';

const router = useRouter()


const home = useHomeStore()
const {bikes} = storeToRefs(home)
const { getBikeByBrand} = home
const api = import.meta.env.VITE_API

const props = defineProps({
    brandId: {type: String, required: true}
})
onMounted(()=>{

    getBikeByBrand(Number(props.brandId))
})



// List of bike data (can be dynamic or fetched from an API)

</script>

<template>
  <div class="container">
    <!-- Loop through bikes and display each one as a card -->
    
    <div  class="card" v-for="b in bikes" :key="b.bike_id">
      <img :src="`${api}${b.img_path}`" alt="">
      <div class="bike-detail">
      <div class="card-content">
        <h3 class="model-name">{{ b.model_name }}</h3>
        <p class="price"><span>Price: </span><span>{{b.price}}</span></p>
        <p class="price"><span>Horsepower: </span><span>{{b.horsepower}}bhp </span></p>
        <p class="price"><span>Torque: </span><span>{{b.torque}}nm </span></p>
        <p class="price"><span>Seat Height: </span><span>{{b.seatheight}}mm </span></p>
        <p class="price"> <span>Stock: </span><span>{{b.stocks}}</span></p>

      </div>
      <RouterLink :to="`/BookingPanel/${b.bike_id}`" class="select-button">Select</RouterLink>
    </div>
    </div>
    
    
  </div>
</template>

<style scoped>
/* Ensure the body covers the full height and centers content */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100vh; /* Full height of the viewport */
}

.bike-detail{
  display: flex;
  flex-direction: column
}



/* The container should be a grid with two columns, and it should be centered */
.container {
  
  display: flex;
  padding: 10% 5%;
}

/* Style for each card */
.card {
  width: 400px;
  margin: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 200ms ease-in-out;


}

/* Hover effect for the cards */
.card:hover {
  transform: translateY(-5px);
 
}

/* Card image styles */
.card img {
 width: 100%;
 height: 300px;
 object-fit:contain;

}

/* Card content styling */
.card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  padding: 10px;
  width: 100%;
}

/* Card title styling */
.card-content h3 {
  font-size: 18px;
  color: #333;
  margin: 0;
}

/* Card price styling */
.card-content .price {
  font-size: 16px;
  color: #777;
  
  
  
}

/* Button styling */
.select-button {
  background-color: red;
  color: white;
  border: none;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0 0 12px 12px;
  text-decoration-line: none;
  text-align: center;
}

/* Button hover effect */
.select-button:hover {
  background-color: green;
  transform: translateY(-5px);
}
</style>



