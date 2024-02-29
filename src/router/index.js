import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
      meta: {
        title: "首頁",
        requiresAuth: true,
      },
    },
    {
      path: "/member",
      name: "member",
      meta: {
        title: "會員管理",
        requiresAuth: true,
      },
      component: () => import("../views/MemberView.vue"),
    },
    {
      path: "/",
      name: "login",
      meta: {
        title: "登入",
        showBar: false, //打開這個即可不顯示header
      },

      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/product",
      name: "product",
      meta: {
        title: "商品管理",
        requiresAuth: true,
      },

      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/bookclander",
      name: "bookclander",
      meta: {
        title: "預訂行事曆",
        requiresAuth: true,
      },
      component: () => import("../views/BookClanderView.vue"),
    },
    {
      path: "/book",
      name: "book",
      meta: {
        title: "預約訂單",
        requiresAuth: true,
      },
      component: () => import("../views/BookView.vue"),
    },
    {
      path: "/table",
      name: "table",
      meta: {
        title: "桌次管理",
        requiresAuth: true,
      },
      component: () => import("../views/TableView.vue"),
    },
    {
      path: "/order",
      name: "order",
      meta: {
        title: "訂單管理",
        requiresAuth: true,
      },
      component: () => import("../views/OrderView.vue"),
    },
    {
      path: "/news",
      name: "new",
      meta: {
        title: "最新消息管理",
        requiresAuth: true,
      },
      component: () => import("../views/NewsView.vue"),
    },
    {
      path: "/code",
      name: "code",
      meta: {
        title: "優惠碼管理",
        requiresAuth: true,
      },
      component: () => import("../views/CodeView.vue"),
    },
    {
      path: "/report",
      name: "report",
      meta: {
        title: "檢舉管理",
        requiresAuth: true,
      },
      component: () => import("../views/ReportView.vue"),
    },
    {
      path: "/team",
      name: "team",
      meta: {
        title: "報隊管理",
        requiresAuth: true,
      },
      component: () => import("../views/TeamView.vue"),
    },
    {
      path: "/permission",
      name: "permission",
      meta: {
        title: "權限管理",
        requiresAuth: true,
      },
      component: () => import("../views/PermissionView.vue"),
    },
    // 404要寫在最下面
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      meta: {
        title: "404NotFound",
        requiresAuth: true,
      },
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

const isAuthenticated = () => {
  const empToken = localStorage.getItem("empToken")
  return empToken? true: false
}


router.beforeEach(async (to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: "login" };
  }
  if (isAuthenticated() && to.name == "login") {
    return { name: "home" };
  }
  const userData = JSON.parse(localStorage.getItem("empDataStr"))
  if (isAuthenticated() && to.name == "permission" && userData.emp_permission !== 'S'){
    return { name: "NotFound" };
  }
  if (isAuthenticated() && (to.name == "code" || to.name == "member" || to.name == "product" || to.name == "table") && (userData.emp_permission !== 'S' && userData.emp_permission !== 'A')){
    return { name: "NotFound" };
  }
});

export default router;
