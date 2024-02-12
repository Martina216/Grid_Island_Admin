<template>
  <div class="sideNavBar">
    <div class="px-0 bg-blue fixed-top min-vh-100 sideNavBarContent">
      <div class="d-flex flex-column px-3 pt-2">
        <RouterLink
          to="/home"
          class="d-flex pb-3 text-white text-decoration-none"
        >
          <img
            class="logo"
            src="@/assets/images/sideNavbar/admitLogo.svg"
            alt="grid_island_logo"
          />
        </RouterLink>
        <ul class="gap nav nav-pills flex-column" id="menu">
          <li class="nav-item">
            <RouterLink to="/member" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">會員管理</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/product" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">商品管理</span>
            </RouterLink>
          </li>
          <li>
            <a
              href="#submenu1"
              data-bs-toggle="collapse"
              class="nav-link px-0 align-middle"
            >
              <span class="ms-1 text-dark fs-5">預約管理</span>
              <i class="fa-solid fa-angle-right"></i>
            </a>
            <div class="collapse" id="submenu1" data-bs-parent="#menu">
              <ul class="nav flex-column ms-4">
                <li class="w-100">
                  <RouterLink to="/bookclander" class="nav-link px-0">
                    <span class="text-dark fs-6">預約行事曆</span>
                  </RouterLink>
                </li>
                <li class="w-100">
                  <RouterLink to="/book" class="nav-link px-0">
                    <span class="text-dark fs-6">預約訂單</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/table" class="nav-link px-0">
                    <span class="text-dark fs-6">桌次管理</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <RouterLink to="order" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">訂單管理</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/news" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">最新消息管理</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/code" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">優惠碼管理</span>
            </RouterLink>
          </li>
          <li>
            <a
              href="#submenu2"
              data-bs-toggle="collapse"
              class="nav-link px-0 align-middle"
            >
              <span class="ms-1 text-dark fs-5">社群管理</span>
              <i class="fa-solid fa-angle-right"></i>
            </a>

            <div id="submenu2" data-bs-parent="#menu" class="collapse">
              <ul class="nav flex-column ms-4">
                <li class="w-100">
                  <RouterLink to="/report" class="nav-link px-0">
                    <span class="text-dark fs-6">留言檢舉管理</span>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/team" class="nav-link px-0">
                    <span class="text-dark fs-6">報隊管理</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item mt-5">
            <RouterLink to="/permission" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">權限管理</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
export default {
  components: {
    RouterLink,
  },
};
</script>
