<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';


const auth = useAuthStore()

const {handleLogin} = auth
const { email, password, error} = storeToRefs(auth)
</script>

<template>
  <section class="login">
    <div class="login-container">
      <div class="user-icon">👤</div>

      <!-- Form -->
      <form @submit.prevent="handleLogin">
        
        <input 
          type="email" 
          placeholder="Email" 
          v-model="email" 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          v-model="password" 
          required 
        />
        <span class="error">{{error}}</span>
        <button type="submit">Login</button>
      </form>

      
    </div>
  </section>
</template>

<style scoped>
.error{
  font-size: 16px;
  color:red;
}
  .login {
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }

  .login-container {
    width: 100%;
    max-width: 400px;
    background-color: #ffffff;
    padding: 40px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login-container .user-icon {
    font-size: 60px;
    color: #555;
    margin-bottom: 20px;
  }

  .login-container input[type="text"],
  .login-container input[type="email"],
  .login-container input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #f9f9f9;
    font-size: 16px;
  }

  input[type="email"]::placeholder {
    color: grey;
  }

  .login-container button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .login-container button:hover {
    background-color: green;
  }

  .status-message {
    font-size: 14px;
    color: green;
    margin-top: 10px;
  }

  .status-message.error {
    color: red;
  }

  input::placeholder {
    color: grey;
  }
</style>

