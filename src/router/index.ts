import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../views/dashboard/index.vue';
import InspectorView from '../views/dashboard/views/inspectorView.vue';
import PassengerView from '../views/dashboard/views/passengerView.vue';
import UserDashboard from '../views/userDashboard/index.vue';
import auth from '../auth';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/dashboard/:id/inpector',
    name: 'dashboard',
    component: InspectorView,
    props: true
  },
  {
    path: '/dashboard/:id/passenger',
    name: 'passenger-detail',
    component: PassengerView,
    props: true
  },
  {
    path: '/user',
    name: 'user',
    component: UserDashboard,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.checkAuth()) {
      next({
        name: 'Login',
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
