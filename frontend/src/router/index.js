import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../views/Layout.vue';
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import BrandView from '@/views/BrandView.vue';
import Brands from '@/views/Brands.vue';
import ContactusView from '@/views/ContactusView.vue';
import Services from '@/views/Services.vue';
import AdminView from '@/views/AdminView.vue';
import AdminLayout from '@/views/AdminLayout.vue';
import BikesView from '@/views/BikesView.vue';
import CustomersView from '@/views/CustomersView.vue';
import PaymentsView from '@/views/PaymentsView.vue';
import ContactUs from '@/views/ContactUs.vue';
import BookingPanelView from '@/views/BookingPanelView.vue';
import Checkoutview from '@/views/CheckoutView.vue';
import { useAuthStore } from '@/stores/auth';

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: HomeView,
          name: 'home',
        },
        {
          path: 'about',
          component: AboutView,
          name: 'about',
        },
        {
          path: 'brand',
          component: BrandView,
          name: 'brand',
        },
        {
          path: 'contactus',
          component: ContactusView,
          name: 'contactus',
        },
        {
          path: 'services',
          component: Services,
          name: 'services',
        },
        {
          path: 'admin-login',
          component: AdminView,
          name: 'adminlogin',
        },
        {
          path: 'BookingPanel/:bikeId',
          component: BookingPanelView,
          name: 'BookingPanel',
          props: true,
        },
      ],
    },
    {
      path: '/Brand/:brandId',
      component: Brands,
      name: 'Brand',
      props: true,
    },
    {
      path: '/CheckoutView/:bikeId/:bookId',
      component: Checkoutview,
      name: 'Checkout',
      props: true,
    },
    {
      path: '/admin',
      component: AdminLayout,
      name: 'AdminLayout',
      children: [
        {
          path: '',
          component: BikesView,
          name: 'Admin-Bikes',
        },
        {
          path: '/customers',
          component: CustomersView,
          name: 'Customers',
        },
        {
          path: '/payments',
          component: PaymentsView,
          name: 'Payments',
        },
        {
          path: '/contact',
          component: ContactUs,
          name: 'contact',
        },
      ],
    },
  ],
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem('token');
  const isLoggedIn = authStore.isLogin;

  if (to.path === '/admin' && !isLoggedIn && !token) {
    // If trying to access /admin without being logged in, redirect to login
    return next('/admin-login');
  } else if (to.path === '/admin-login' && isLoggedIn) {
    // If already logged in, prevent redirect to login
    return next('/admin');
  }

  next();
});

export default router;
