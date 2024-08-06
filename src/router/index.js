// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import AppList from "../views/AppList.vue";
import SignIn from "../views/SignIn.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: AppList,
  },
  {
    path: "/signin",
    name: "Sign In",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
