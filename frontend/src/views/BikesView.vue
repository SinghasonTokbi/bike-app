<script setup>
import { ref, onMounted } from 'vue';
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';
import axios from 'axios';
const api = import.meta.env.VITE_API
const home = useHomeStore();
const { getBrands } = home;
const { brands } = storeToRefs(home);

// Form data state
const formData = ref({
  bikeId: '',
  modelName: '',
  brand: '', // This will store the selected brand's ID
  price: '',
  horsepower: '',
  torque: '',
  seatHeight: '',
  image: null, // Holds the file
  stocks: '',
});

// State for the list of bikes
const bikes = ref([]);

// Handle file selection
const handleFileChange = (event) => {
  formData.value.image = event.target.files[0];
  console.log(formData.value.image)
};

// Fetch existing bikes from the server (initial load)
const fetchBikes = async () => {
  try {
    const response = await axios.get('/bikes');
    
    bikes.value = response.data
  } catch (error) {
    console.error(error);
  }
};

// Submit the form and add a new bike
const handleSubmit = async () => {
  try {
    const formDataToSend = new FormData();
    Object.keys(formData.value).forEach((key) => {
      if (key === 'image') {
        if (formData.value[key]) {
          formDataToSend.append('image', formData.value[key]);
        }
      } else {
        formDataToSend.append(key, formData.value[key]);
      }
    });

    // Send the form data (including the file) to the server
    const response = await axios.post('/add-bikes', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle successful response
    console.log(response.data);
    await fetchBikes();
    alert('Bike added successfully!');
  } catch (error) {
    console.error(error);
    alert('An error occurred while adding the bike.');
  }
};

const deleteBike = async(bikeId)=>{
  try{
    const response = await axios.delete(`/del-bike/${bikeId}`)
    fetchBikes()
    alert("bike deleted")
  }catch(err){
    console.log(err)
    alert('Cannot delete! Bike already booked by customers')
  }
}

// Fetch bikes and brands when the component loads
onMounted(async () => {
  await fetchBikes();
  await getBrands();
});
</script>

<template>
  <div class="container" v-if="brands && brands.length > 0">
   
    <form @submit.prevent="handleSubmit">
      <!-- <input v-model="formData.bikeId" placeholder="Bike ID" required /> -->
      <input v-model="formData.modelName" placeholder="Model Name" required />

      <!-- Select input for brand -->
      <select v-model="formData.brand" required>
        <option value="" disabled>Select Brand</option>
        <option v-for="brand in brands" :key="brand.brand_id" :value="brand.brand_id">
          {{ brand.brand_name }}
        </option>
      </select>

      <input v-model="formData.price" placeholder="Price" required />
      <input v-model="formData.horsepower" placeholder="Horsepower" required />
      <input v-model="formData.torque" placeholder="Torque" required />
      <input v-model="formData.seatHeight" placeholder="Seat Height" required />
      <input type="file" @change="handleFileChange" accept="image/*" required />
      <input v-model="formData.stocks" placeholder="Stocks" required />
      <button type="submit">Add Bike</button>
    </form>

    <table>
      <thead>
        <tr>
          <th></th>
          <th>Bike ID</th>
          <th>Model Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Horsepower</th>
          <th>Torque</th>
          <th>Seat Height</th>
          <th>Stocks</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in bikes">
          <td><img :src="`${api}${b.img_path}`" alt="" class="bikeImg"></td>
          <td>{{ b.bike_id}}</td>
          <td>{{ b.model_name }}</td>
          <td>{{ b.brand_name }}</td>
          <td>{{ b.price }}</td>
          <td>{{ b.horsepower}}</td>
          <td>{{b.torque}}</td>
          <td>{{b.seatheight}}</td>
          <td>{{b.stocks }}</td>
          <td class="delete" @click="deleteBike(b.bike_id)">Delete</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px; 
    margin-top: 20px;
}

.delete{
  color: red;
 
  cursor: pointer;
}

.delete:hover{
  text-decoration: underline;

}
.bikeImg{
  height: 100px;
  width: 100px;
  object-fit:contain;
}

table {
    width: 100%;
    border-collapse: collapse; 
    margin-bottom: 20px;
    padding-top: 20px;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ccc; 
    padding: 12px 15px; 
    text-align: left;
}

th {
    background-color: #f4f4f4; 
    font-weight: bold;
    color: #333; 
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9; 
}

tbody tr:hover {
    background-color: #e0f7fa;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 320px; 
    padding: 16px;
    margin-top: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    background-color: #ebeaea;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

button {
    margin-top: 15px;
    padding: 8px 14px; 
    background: linear-gradient(45deg, #ff4b2b, #ff416c);
    color: #ffffff;
    font-weight: 600;
    font-size: 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
    background: linear-gradient(45deg, #28a745, #218838); 
    transform: scale(1.05);
}

input, textarea, select {
    width: 100%;
    padding: 5px; 
    margin: 8px 0;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 15px; 
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

label {
    align-self: flex-start;
    font-size: 15px; 
    font-weight: 500;
    color: #333;
    margin-bottom: 4px; 
}
</style>
