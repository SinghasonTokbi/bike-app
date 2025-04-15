<script setup>
import { RouterLink } from 'vue-router';


import {ref, onMounted} from 'vue'
import { storeToRefs } from 'pinia';
import { useHomeStore } from '@/stores/home';

const home = useHomeStore()
const {brands} = storeToRefs(home)
const {getBrands} = home
const api = import.meta.env.VITE_API

onMounted(()=>{
    getBrands()
})
</script>
<template>
    <div class="brand-grid">
      
      <section class="brand-container">
        <div v-for="e in brands" :key="e.id">
            <RouterLink :to="`/Brand/${e.brand_id}`" class="brand" >
            
            
                <img :src="`${api}${e.brand_imgpath}`" :alt="e.brand_name">
                <!-- <div>{{ e.brand_name}}</div> -->
              </RouterLink>
        </div>
        
       
      </section>
    </div>
  </template>
  
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.brand-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.brand-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2px 15%;
   
}

.brand {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
     
    transition: transform 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    margin: 10px;
}

.brand img {
    width: 100%;
    height: auto;
    display: block;
    margin: 0;
    object-fit: cover;
    border-radius: 8px; 
}

.brand:hover {
    transform: translateY(-5px);
}

@media (max-width: 600px) {
    .brand-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
}
</style>