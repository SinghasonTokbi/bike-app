import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const email = ref('');
  const password = ref('');
  const error = ref('');
  const isLogin = ref(false);
  const currentUser = ref({});
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/admin/login', {
        email: email.value,
        password: password.value,
      });

      const token = response.data.token;

      localStorage.setItem('token', token);

      isLogin.value = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      currentUser.value = await decodeToken();

      localStorage.setItem('user', JSON.stringify(currentUser.value));

      router.push('/admin');

      password.value = '';
      email.value = '';
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        error.value = err.response.data.message;
      } else {
        error.value = 'An error occurred while logging in.';
      }
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    isLogin.value = false;
    currentUser.value = null;

    delete axios.defaults.headers.common['Authorization'];

    router.push('/admin-login');
  };

  const decodeToken = async () => {
    try {
      const response = await axios.post('/admin/decode-token');
      return response.data;
    } catch (err) {
      console.error('Failed to decode token:', err);
      return null;
    }
  };

  return { handleLogin, handleLogout, currentUser, email, password, isLogin, error };
});
