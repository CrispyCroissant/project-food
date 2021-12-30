import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import DashBoard from "../views/Dashboard.vue";
import store from "@/store/index.js";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/login",
    name: "SignIn",
    component: SignIn,
    props: true,
  },
  {
    path: "/register",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/",
    name: "Dashboard",
    component: DashBoard,
    async beforeEnter(to, from, next) {
      if (store.state.isLoggedIn) {
        next();
      } else {
        try {
          await store.dispatch("isAuthenticated");
          next();
        } catch (error) {
          next({ name: "SignIn" });
        }
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
