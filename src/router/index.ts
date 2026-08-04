import { createRouter, createWebHistory } from "vue-router";
import { showErrorMessage } from "@/utils";
import UserService from "@/services/api/user-services";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/",
    component: () => import("@/layouts/UserAuth.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/auth/UserLogin.vue"),
        meta: { guest: true },
      },
      {
        path: "register",
        name: "register",
        component: () => import("@/views/auth/UserRegister.vue"),
        meta: { guest: true },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SettingPage.vue"),
    children: [
      {
        path: "/dashboard",
        name: "DashboardPage",
        component: () => import("@/views/sidebarSettingpages/DashboardPage.vue"),
        // meta: { requireAuth: true},
      },
      {
        path: "/forms",
        name: "FormsPage",
        component: () => import("@/views/sidebarSettingpages/FormsPage.vue"),
        // meta: { requireAuth: true },
      },
      {
        path: "/submissions",
        name: "SubmissionsPage",
        component: () => import("@/views/sidebarSettingpages/SubmissionsPage.vue"),
        // meta: { requireAuth: true},
      },
      {
        path: "/form-settings/:uniqueId?",
        name: "FormSettingsPage",
        component: () => import("@/views/sidebarSettingpages/FormSettingsPage.vue"),
        // meta: { requireAuth: true},
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (_to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requireAuth);
  const auth = sessionStorage.getItem("authToken") as string;
  const redirectPath = sessionStorage.getItem("redirectPath");

  if (!requiresAuth) {
    return next();
  }

  if (!auth) {
    // Not logged in -> save redirect and go to login
    sessionStorage.setItem("redirectPath", to.fullPath);
    return next({ path: "/login" });
  }

  if (requiresAuth) {
    let isVerifyToken = false;
    try {
      const res = await new UserService().getShopToken("verify-token");
      isVerifyToken = Boolean(res.verify_token);
      if (!isVerifyToken && res.message) {
        showErrorMessage(res.message);
      }
    } catch (err) {
      // Network or server error — treat as not verified
      showErrorMessage(err);
      isVerifyToken = false;
    }

    if (!isVerifyToken) {
      // token invalid -> clear session and redirect to login
      sessionStorage.clear();
      sessionStorage.setItem("redirectPath", to.fullPath);
      return next({ path: "/login" });
    }

    // token valid
    if (redirectPath && auth && isVerifyToken) {
      // if we stored a redirect, go there first and remove it
      sessionStorage.removeItem("redirectPath");
      return next({ path: redirectPath });
    }

    // otherwise proceed to requested route
    return next();
  }
});

export default router;
