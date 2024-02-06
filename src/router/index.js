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
      path: "/newspage",
      name: "newsPage",
      meta: {
        title:"最新消息新增測試",
      },
      component: () => import("../views/NewsTestView.vue"),
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
      path: "/permission",
      name: "permission",
      meta: {
        title:"權限管理",
      },
      component: () => import("../views/PermissionView.vue"),
    },
    // 404要寫在最下面
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
            meta: {
        title:"404NotFound",
      },
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});
// 登入最基本判斷，也是最不安全的做法
// 未來可以再深入研究，關鍵字Authentication
// 並加入動態路由https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html
// const isAuthenticated = () => {
//   const userToken = localStorage.getItem("userToken")
//   return userToken? true: false
// }

// router.beforeEach((to) => {
//   // 加入頁籤標題
//   if (to.meta && to.meta.title) {
//     document.title = to.meta.title
//   }
  
//   // 參考文件
//   // https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
//   if(to.name == 'register' ){
//     return

//   }else if ( !isAuthenticated() && to.name !== 'login') {
//     // 检查用户是否已登录 && 避免无限重定向
//     // 将用户重定向到登录页面
//     console.log(1);
//     return { name: 'login' }
//   }
// })

export default router;
