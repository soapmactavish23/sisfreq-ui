import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

const routes = [
  {
    path: "/system",
    name: "app",
    component: App,
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("./pages/main/Home.vue"),
      },
      {
        path: "/services",
        name: "services",
        component: () => import("./pages/services/ServiceView.vue"),
      },
      {
        path: "/category-services",
        name: "category-services",
        component: () => import("./pages/category_service/CategoryServiceView.vue"),
      },
      {
        path: "/banner",
        name: "/banner",
        component: () => import("./pages/banners/BannerView.vue"),
      },
      {
        path: "/persons",
        name: "persons",
        component: () => import("./pages/persons/PersonView.vue"),
      },
      {
        path: "/genders",
        name: "genders",
        component: () => import("./pages/genders/GenderView.vue"),
      },
      {
        path: "/locals",
        name: "locals",
        component: () => import("./pages/local/LocalView.vue"),
      },
      {
        path: "/sectors",
        name: "sectors",
        component: () => import("./pages/sector/SectorView.vue"),
      },
      {
        path: "/permissions",
        name: "permissions",
        component: () => import("./pages/permission/PermissionView.vue"),
      },
      {
        path: "/users",
        name: "users",
        component: () => import("./pages/users/UsersView.vue"),
      },
      {
        path: "/groups",
        name: "groups",
        component: () => import("./pages/groups/GroupsView.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("./pages/profile/ProfileView.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "login",
    component: () => import("./pages/main/Login.vue"),
  },
  {
    path: '/recoverPassword',
    name: 'recoverPassword',
    component: () => import('./pages/users/UserRecoverPasswordView.vue'),
},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
