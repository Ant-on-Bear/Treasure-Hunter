import Vue from "vue";
import VueRouter from "vue-router";

import WelcomePage from "../components/welcome/welcome.vue";
import DashboardPage from "../components/dashboard/dashboard.vue";
import SignupPage from "../components/auth/signup.vue";
import SigninPage from "../components/auth/signin.vue";
import WrongPage from "../components/wrong.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: WelcomePage },
  { path: "/signup", component: SignupPage },
  { path: "/signin", component: SigninPage },
  { path: "/wrong", component: WrongPage },
  {
    path: "/dashboard",
    component: DashboardPage,
    beforeEnter(to, from, next) {
      debugger;
      const getToken = localStorage.getItem("token");
      if (getToken) {
        debugger;
        next();
      } else {
        next("/signin");
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
