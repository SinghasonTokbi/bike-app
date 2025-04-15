<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted} from 'vue'
import { storeToRefs } from 'pinia';
import { useHomeStore } from '@/stores/home';
 

const home = useHomeStore()
const {bikes, selectedBike, form, errors} = storeToRefs(home)
const {getBikeById, addCustomer} = home
const api = import.meta.env.VITE_API
// Define props
const props = defineProps({
  bikeId: {
    type: String,
    required: true,
  },
});



onMounted(async()=>{
  getBikeById(Number(props.bikeId))

})

// Form state


// Get today's date in YYYY-MM-DD format for min date validation
const today = new Date();
const minDate = today.toISOString().split('T')[0]; // Extract only the date portion (YYYY-MM-DD)

// Router instance
const router = useRouter();

// Validation function
const validateForm = () => {
  let isValid = true;

  // Reset errors
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = ''; // Reset errors before validation
  });

  // Validate Customer Name
  if (!form.value.customerName.trim()) {
    errors.value.customerName = 'Customer name is required';
    isValid = false;
  }

  // Validate Address
  if (!form.value.address.trim()) {
    errors.value.address = 'Address is required';
    isValid = false;
  }

  // Validate Phone Number
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(form.value.phoneNumber)) {
    errors.value.phoneNumber = 'Phone number must be 10 digits';
    isValid = false;
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Invalid email address';
    isValid = false;
  }

  // Validate Booking Date
  if (!form.value.bookingDate) {
    errors.value.bookingDate = 'Booking date is required';
    isValid = false;
  }

  return isValid;
};

// Watch the form data to update form validity
const isFormValid = ref(false);

// Watch the form and validate on any change
watch(form, () => {
  isFormValid.value = validateForm();
}, { deep: true });

// Proceed to Checkout (via RouterLink)
const proceedToCheckout = () => {
  if (isFormValid.value) {
    router.push({ name: 'CheckoutView', query: { bikeId: props.bikeId, ...form.value } });
  }
};
</script>

<template>
  <div class="container" v-if="selectedBike.length > 0">
   
    <div class="bike-details">
      <img :src="`${api}${selectedBike[0].img_path}`" alt="" class="bike-pic"/>
      <div class="details">
        <p><strong>Model Name:</strong> {{selectedBike[0].model_name}}</p>
        <p><strong>Brand:</strong> {{selectedBike[0].brand_name}}</p>
        <p><strong>Price (₹):</strong>{{selectedBike[0].price}}</p>
        <p><strong>Horsepower:</strong> {{selectedBike[0].horsepower}}</p>
        <p><strong>Torque:</strong> {{selectedBike[0].torque}}</p>
        <p><strong>Seat Height:</strong> {{selectedBike[0].seatheight}}</p>
        <p><strong>Stocks:</strong> {{selectedBike[0].stocks}}</p>
      </div>

      
    </div>

    <form class="booking-form" @submit.prevent="addCustomer(selectedBike[0].bike_id)">
      <label for="customer-name">Customer Name</label>
      <input
        type="text"
        id="customer-name"
        v-model="form.customerName"
        placeholder="Enter your name"
      />
      <span class="error" v-if="errors.customerName">{{ errors.customerName }}</span>

      <label for="address">Address</label>
      <input
        type="text"
        id="address"
        v-model="form.address"
        placeholder="Enter your address"
      />
      <span class="error" v-if="errors.address">{{ errors.address }}</span>

      <label for="phone-number">Phone Number</label>
      <input
        type="tel"
        id="phone-number"
        v-model="form.phoneNumber"
        placeholder="Enter your phone number"
      />
      <span class="error" v-if="errors.phoneNumber">{{ errors.phoneNumber }}</span>

      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        placeholder="Enter your email"
      />
      <span class="error" v-if="errors.email">{{ errors.email }}</span>

      <label for="booking-date">Booking Date</label>
      <input type="date" id="booking-date" v-model="form.bookingDate" :min="minDate" />
      <span class="error" v-if="errors.bookingDate">{{ errors.bookingDate }}</span>

      <!-- Proceed Button, always visible, but will only proceed if form is valid -->
      <button
        v-if="isFormValid" type="submit"
        
        class="select-button" 
      >
        Proceed
      </button>
      <div v-else class="error">Please fill in all form to proceed.</div>
    </form>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--secondary-color);
  color: var(--text-color);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}


.bike-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.bike-details,
.booking-form {
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
  background-color: white;
  object-fit: contain;
}

.bike-details p {
  margin: 5px 0;
}

.details {
  background-color: white;
  display: flex;
  flex-direction: column;
}

.booking-form {
  display: grid;
  grid-template-columns: 1fr 2fr; /* Adjust grid structure for better alignment */
  gap: 15px;
  align-items: center;
}

.booking-form label {
  font-weight: bold;
  text-align: left;
}

.booking-form input,
.booking-form select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  font-size: 16px;
}

.booking-form .full-row {
  grid-column: span 3;
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 4px;
  grid-column: span 2; /* Span the error message across both columns */
}

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
  align-items: center;
}

.select-button:hover {
  background-color: green;
  transform: translateY(-5px);
}

.select-button.disabled {
  background-color: grey;
  cursor: not-allowed;
}
</style>



  
