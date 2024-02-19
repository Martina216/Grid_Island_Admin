<template>
  <main class="cuppon">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">優惠碼管理</li>
      </ol>
    </nav>
    <div class="titleGroup pb-5">
      <h1>優惠碼管理</h1>
      <div class="searchGroup">
        <select id="searchFilter" class="rounded border border-1 border-dark">
          <option value="promoId">優惠碼序號</option>
          <option value="mewsDetail">優惠碼說明</option>
        </select>
        <input
          type="text"
          id="searchBar"
          placeholder="請輸入查詢資料"
          class="rounded border border-1 border-dark"
        />
      </div>
    </div>
    <div class="addProductBtn">
      <button type="button" class="btn btn-info">
        <i class="fa-solid fa-plus"></i>新增優惠碼
      </button>
    </div>
    <div class="prodTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-left">
            <th scope="col">編號</th>
            <th scope="col">優惠碼序號</th>
            <th scope="col">優惠碼說明</th>
            <th scope="col">使用開始日期</th>
            <th scope="col">使用結束日期</th>
            <th scope="col">優惠碼狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in promoData"
            class="border-bottom text-left align-middle"
          >
            <th class="pb-3 pt-3 text-center number">{{ item.promo_id }}</th>
            <td class="cupponCode">{{ item.promo_code }}</td>
            <td class="detail">{{ item.promo_detail }}</td>
            <td class="date">
              {{ item.promo_start_date }}
            </td>
            <td class="date">
              {{ item.promo_end_date }}
            </td>
            <td class="state">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  role="switch"
                  type="checkbox"
                  :name="item.promo_id"
                  :id="item.promo_id"
                  :checked="item.promo_state == 1"
                />
                <label class="form-check-label" :for="item.promo_id"></label>
              </div>
              <span v-if="item.promo_state == 1">已啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button type="button" class="btn btn-info">
                <i class="fa-solid fa-pen-to-square"></i>編輯
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      promoData: [],
    };
  },
  components: {},
  created() {
    this.fetchCode();
  },
  methods: {
    fetchCode() {
      axios.post(`${import.meta.env.VITE_API_URL}/getCode.php`).then((res) => {
        this.promoData = res.data.promos;
      });
    },
  },
  mounted() {},
};
</script>
