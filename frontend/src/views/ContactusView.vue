<script setup>
import axios from "axios";
import { ref } from "vue";

// Reactive variables for form fields
const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const email = ref("");
const message = ref("");

// Reactive variable for submission status
const submissionStatus = ref("");

// Function to validate the form inputs
const validateForm = () => {
  if (!firstName.value || !lastName.value || !phone.value || !email.value || !message.value) {
    return "All fields are required.";
  }
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    return "Please enter a valid email address.";
  }
  return null; // No validation errors
};

// Function to simulate form submission
const handleSubmit = async () => {
  try{
    const response = await axios.post('/book-contactus',{
      firstname: firstName.value,
      lastname: lastName.value,
      phoneno: phone.value,
      email: email.value,
      messages: message.value
    })
  }catch(err){
    console.log(err)
  }
};

// Function to clear the form fields
const clearForm = () => {
  firstName.value = "";
  lastName.value = "";
  phone.value = "";
  email.value = "";
  message.value = "";
};
</script>

<template>
  <section class="contact">
    <div class="contact-form">
      <h2>Contact Us</h2>
      <form @submit.prevent="handleSubmit">
        <label for="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          v-model="firstName"
          required
        />

        <label for="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          v-model="lastName"
          required
        />

        <label for="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          v-model="phone"
          required
        />

        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
        />

        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="message"
          rows="4"
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      <!-- Display the submission status -->
      <p v-if="submissionStatus" style="margin-top: 20px; color: #555;">{{ submissionStatus }}</p>
    </div>
  </section>
</template>

<style scoped>

  .contact{
    display: flex;
    width: 100%;
    height: 90vh;
    justify-content: center;
    align-items: center;
  }
  .contact-form {

    
    width: 100%;
    max-width: 400px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .contact-form h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }

  .contact-form label {
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
    display: block;
  }

  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
  }

  .contact-form input:focus,
  .contact-form textarea:focus {
    outline: none;
    border-color: #333;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .contact-form button {
    width: 100%;
    padding: 10px;
    background-color: #e63946;
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .contact-form button:hover {
    background-color: #d62828;
  }
</style>