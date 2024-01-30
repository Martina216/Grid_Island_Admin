<template>
  <div class="sideNavBar">
    <div class="col-2 px-0 bg-info fixed-top min-vh-100">
      <div class="d-flex flex-column px-3 pt-2">
        <RouterLink to="/" class="d-flex pb-3 text-white text-decoration-none">
          <img src="@/assets/images/sideNavbar/admitLogo.svg" alt="" />
        </RouterLink>
        <ul class="nav nav-pills flex-column" id="menu">
          <li class="nav-item">
            <RouterLink to="/member" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">會員管理</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">商品管理</span>
            </a>
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
            <ul
              class="collapse nav flex-column ms-4"
              id="submenu1"
              data-bs-parent="#menu"
            >
              <li class="w-100">
                <a href="#" class="nav-link px-0">
                  <span class="text-dark fs-6">預約行事曆</span>
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-0">
                  <span class="text-dark fs-6">預約訂單</span>
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-0">
                  <span class="text-dark fs-6">場地管理</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">訂單管理</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">最新消息管理</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">優惠碼管理</span>
            </a>
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

            <ul
              class="collapse nav flex-column ms-4"
              id="submenu2"
              data-bs-parent="#menu"
            >
              <li class="w-100">
                <a href="#" class="nav-link px-0">
                  <span class="text-dark fs-6">留言檢舉管理</span>
                </a>
              </li>
              <li>
                <a href="#" class="nav-link px-0">
                  <span class="text-dark fs-6">報隊管理</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item mt-5">
            <a href="#" class="nav-link align-middle px-0">
              <span class="ms-1 text-dark fs-5">權限管理</span>
            </a>
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
