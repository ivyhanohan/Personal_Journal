import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import AddEntry from '../views/AddEntry.vue';
import { auth } from '../firebase';

const routes = [
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/add-entry', component: AddEntry },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    const user = auth.currentUser;
    if (to.path !== '/login' && !user) next('/login');
    else next();
  });
  
  export default router;
  




