<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    
        <section>
        <section class="main-section">
            <h1>Start your adventure with ease!<br>Book your bike in just a few clicks and get ready to ride.</h1>
            <RouterLink to="/brand" class="button">Book</RouterLink>
          </section>
          <section class="banner">

          </section>
        
     </section>
   
</template>

<style scoped>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .banner{
      width: 100%;
      height: 50vh;
    
      background: url(https://wallpaperaccess.com/full/2300896.jpg);
      background-size: cover;
      background-repeat: no-repeat;
    
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }

    header {
      background-color: white;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    header .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }

    header nav a {
      margin-left: 20px;
      text-decoration: none;
      color: black;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    header nav a:hover {
      color: red;
    }

    .main-section {
      text-align: center;
      padding: 100px 0;
      background: linear-gradient(45deg, #f0f0f0, #fff);
    }

    .main-section h1 {
      font-size: 2.2rem;
      font-weight: bold;
      margin-bottom: 30px;
      color: #333;
    }

    .main-section .button {
      background-color: red;
      color: white;
      padding: 15px 30px;
      border: none;
      border-radius: 5px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
      text-decoration: none
    }

    .main-section .button:hover {
      background-color: rgb(0, 139, 65);
    }
    
  </style>