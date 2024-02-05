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
            <th class="pb-3 pt-3 text-center number">{{ item.promoId }}</th>
            <td class="cupponCode">{{ item.promoCode }}</td>
            <td class="detail" >{{ item.promoDetail }}</td>
            <td class="date" >
              {{ item.promoStartDate }}
            </td>
            <td class="date" >
            {{ item.promoEndDate }}
            </td>
            <td class="state">
              {{ item.promoState }}
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
export default {
  data() {
    return {
      promoData: [
        {
          promoId: 1,
          promoCode:'GridIsland',
          promoStartDate:'2020-01-01',
          promoEndDate:'9999-12-31',
          promoState:'使用中',
          promoDetail: "捏小蟲送50元",
          promoCategory: "優惠",
        },
        {
          promoId: 2,
          promoCode:'GridIsland2023',
          promoStartDate:'2020-01-01',
          promoEndDate:'9999-12-31',
          promoState:'使用中',
          promoDetail: "玩小遊戲送50元",
          promoCategory: "桌遊",
        },
      ],
    };
  },
  components: {},
  mounted() {},
};
</script>
