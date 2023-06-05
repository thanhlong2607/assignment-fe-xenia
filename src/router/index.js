import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
import store from "../store";
import axios from "../config/axios";
const routes = [
  {
    path: "/",
    children: [
      {
        path: "/",
        name: "getStarted",
        component: () => import("@/pages/startedPages/getStarted.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "/authentication",
        children: [
          {
            path: "sign-in",
            name: "signIn",
            component: () =>
              import("@/pages/startedPages/Authentication/signIn.vue"),
            meta: { requiresAuth: false },
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    component: AuthenticatedLayout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/pages/loginedPages/Dashboard/index.vue"),
        meta: { requiresAuth: true, activeRoute: true },
      },
     
      {
        path: "/new-user",
        name: "newUser",
        component: () => import("@/pages/loginedPages/User/AddNewUser.vue"),
        meta: { requiresAuth: true, activeRoute: true },
      },
      {
        path: "/new-car",
        name: "newCar",
        component: () => import("@/pages/loginedPages/Car/AddNewCar.vue"),
        meta: { requiresAuth: true, activeRoute: true },
      },
      {
        path: "/new-booking",
        name: "newBooking",
        component: () => import("@/pages/loginedPages/Booking/AddNewBooking.vue"),
        meta: { requiresAuth: true, activeRoute: true },
      },
      {
        path: "/users",
        component: () => import("@/pages/loginedPages/User/index.vue"),
        meta: { requiresAuth: true, activeRoute: true },
        children: [
          {
            path: "",
            name: "User",
            component: () =>
              import("@/pages/loginedPages/User/ListUser.vue"),
            meta: { requiresAuth: true, activeRoute: true },
          },
          {
            path: "detail/:id",
            name: "detailUser",
            component: () => import("@/pages/loginedPages/User/Detail.vue"),
            meta: { requiresAuth: true, activeRoute: true },
          },
        ],
      },
      {
        path: "/bookings",
        component: () => import("@/pages/loginedPages/Booking/index.vue"),
        meta: { requiresAuth: true, activeRoute: true },
        children: [
          {
            path: "",
            name: "Booking",
            component: () =>
              import("@/pages/loginedPages/Booking/ListBooking.vue"),
            meta: { requiresAuth: true, activeRoute: true },
          },
          {
            path: "detail/:id",
            name: "detailBooking",
            component: () => import("@/pages/loginedPages/Booking/Detail.vue"),
            meta: { requiresAuth: true, activeRoute: true },
          },
        ],
      },
      {
        path: "/cars",
        component: () => import("@/pages/loginedPages/Car/index.vue"),
        meta: { requiresAuth: true, activeRoute: true },
        children: [
          {
            path: "",
            name: "cars",
            component: () => import("@/pages/loginedPages/Car/ListCar.vue"),
            meta: { requiresAuth: true, activeRoute: true },
          },
          {
            path: "detail/:id",
            name: "detailCar",
            component: () => import("@/pages/loginedPages/Car/Detail.vue"),
            meta: { requiresAuth: true, activeRoute: true },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (Object.keys(store.state.authentication.userInfo).length) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `${store.state.authentication.userInfo.tokenType} ${store.state.authentication.userInfo.accessToken}`;
      if (to.meta.activeRoute) {
        return next();
      } else {
        return next({ name: "403" });
      }
    }
    return next({ name: "signIn" });
  }
  next();
});
export default router;
