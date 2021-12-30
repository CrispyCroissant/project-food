import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import DashBoard from "../views/Dashboard.vue";

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
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
