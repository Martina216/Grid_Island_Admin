<template>
  <main class="member">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">會員管理</li>
      </ol>
    </nav>
    <div class="titleGroup">
      <h1>會員管理</h1>
      <div class="searchGroup">
        <select id="searchFilter" class="rounded border border-1 border-dark">
          <option value="memId">會員編號</option>
          <option value="memName">會員姓名</option>
          <option value="memTel">連絡電話</option>
          <option value="memEmail">電子信箱</option>
        </select>
        <input
          type="text"
          id="searchBar"
          placeholder="請輸入查詢資料"
          class="rounded border border-1 border-dark"
        />
      </div>
    </div>
    <div class="memTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-center">
            <th scope="col">會員編號</th>
            <th scope="col">會員姓名</th>
            <th scope="col">連絡電話</th>
            <th scope="col">電子信箱(帳號)</th>
            <th scope="col">權限管理</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in memData" class="border-bottom text-center">
            <th class="pb-3 pt-3">{{ item.memId }}</th>
            <td>{{ item.memName }}</td>
            <td>{{ item.memTel }}</td>
            <td>{{ item.memEmail }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input "
                  role="switch"
                  type="checkbox"
                  :name="item.ordId"
                  :id="item.ordId"
                  v-model="item.memState"
                />
                <label class="form-check-label" :for="item.ordId"></label>
              </div>
              <div class="ordState">
                <span v-if="item.memState">正常</span>
                <span v-else>已停權</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      memData: [
        {
          memId: 1,
          memName: "張基德大寶寶",
          memTel: "0911-111-000",
          memEmail: "gider@gmail.com",
          memState:true,
        },
        {
          memId: 2,
          memName: "揍迪客",
          memTel: "0911-222-000",
          memEmail: "zhudick@gmail.com",
          memState:true,
        },
        {
          memId: 3,
          memName: "雅婷揍迪客",
          memTel: "0911-333-000",
          memEmail: "zhudicker@gmail.com",
          memState:true,
        },
        {
          memId: 4,
          memName: "小J",
          memTel: "0911-444-000",
          memEmail: "giantj@mail.com",
          memState:true,
        },
        {
          memId: 5,
          memName: "劉比絲吉",
          memTel: "0911-555-000",
          memEmail: "bisgi@hotmail.com",
          memState:true,
        },
      ],
    };
  },
  components: {},
  mounted() {},
};
</script>
