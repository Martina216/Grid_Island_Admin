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
        title:"首頁",
      },
      
    },
    {
      path: "/member",
      name: "member",
      meta: {
        title:"會員管理",
      },
      component: () => import("../views/MemberView.vue"),
    },
    {
      path: "/",
      name: "login",
      meta: {
        title:"登入",
        showBar: false, //打開這個即可不顯示header
      },
      
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/product",
      name: "product",
      meta: {
        title:"商品管理",
      },
      
      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/bookclander",
      name: "bookclander",
      meta: {
        title:"預訂行事曆",
      },
      component: () => import("../views/BookClanderView.vue"),
    },
    {
      path: "/book",
      name: "book",
      meta: {
        title:"預約訂單",
      },
      component: () => import("../views/BookView.vue"),
    },
    {
      path: "/table",
      name: "table",
      meta: {
        title:"桌次管理",
      },
      component: () => import("../views/TableView.vue"),
    },
    {
      path: "/order",
      name: "order",
      meta: {
        title:"訂單管理",
      },
      component: () => import("../views/OrderView.vue"),
    },
    {
      path: "/news",
      name: "new",
      meta: {
        title:"最新消息管理",
      },
      component: () => import("../views/NewsView.vue"),
    },
    {
      path: "/code",
      name: "code",
      meta: {
        title:"優惠碼管理",
      },
      component: () => import("../views/CodeView.vue"),
    },
    {
      path: "/report",
      name: "report",
      meta: {
        title:"檢舉管理",
      },
      component: () => import("../views/ReportView.vue"),
    },
    {
      path: "/team",
      name: "team",
      meta: {
        title:"報隊管理",
      },
      component: () => import("../views/TeamView.vue"),
    },
    {
      path: "/premission",
      name: "premission",
      meta: {
        title:"權限管理",
      },
      component: () => import("../views/PremissionView.vue"),
    },
  ],
});

export default router;
