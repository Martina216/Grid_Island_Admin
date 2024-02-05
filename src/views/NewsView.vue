<template>
  <main class="news">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">最新消息管理</li>
      </ol>
    </nav>
    <div class="titleGroup pb-5">
      <h1>最新消息管理</h1>
      <div class="stateFilter">
        <span>全部(10)</span>
        <span>優惠(4)</span>
        <span>桌遊(3)</span>
        <span>活動(3)</span>
      </div>
      <div class="searchGroup">
        <select id="searchFilter" class="rounded border border-1 border-dark">
          <option value="newsId">排序編號</option>
          <option value="mewsName">消息標題</option>
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
        <i class="fa-solid fa-plus"></i>新增消息
      </button>
    </div>
    <div class="prodTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-left">
            <th scope="col">排序編號</th>
            <th scope="col">消息圖片</th>
            <th scope="col">消息標題</th>
            <th scope="col">消息分類</th>
            <th scope="col">消息狀態</th>
            <th scope="col">編輯消息</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in newsData"
            class="border-bottom text-left align-middle"
          >
            <th class="pb-3 pt-3 text-center number">{{ item.newsId }}</th>
            <td>
              <img src="https://i.imgur.com/DtgOnXU.jpeg" class="rounded img" />
            </td>
            <td class="name">{{ item.newsName }}</td>
            <td>{{ item.newsCategory }}
            </td>
            <td class="text-center">
              <div class="form-check form-switch">
                <input
                  class="form-check-input "
                  role="switch"
                  type="checkbox"
                  :name="item.ordId"
                  :id="item.ordId"
                  v-model="item.newsState"
                />
                <label class="form-check-label" :for="item.ordId"></label>
              </div>
              <div class="ordState">
                <span v-if="item.newsState">已發佈</span>
                <span v-else>未發佈</span>
              </div>
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
      newsData: [
        {
          newsId: 1,
          newsName: "新春特惠：1月25日至2月5日，任意桌遊享限時折扣！",
          newsCategory: "優惠",
          newsState:true,
        },
        {
          newsId: 2,
          newsName: "老闆娘推薦：本月十大必玩桌遊盤點",
          newsCategory: "桌遊",
          newsState:false,
        },
        {
          newsId: 3,
          newsName: "桌遊夜：每週五晚上，來店體驗最新的桌遊大作！",
          newsCategory: "活動",
          newsState:true,
        },
        {
          newsId: 4,
          newsName: "限量版桌遊收藏家系列：獨家發售通知",
          newsCategory: "桌遊",
          newsState:true,
        },
        {
          newsId: 5,
          newsName: "新春特惠：1月25日至2月5日，任意桌遊享限時折扣！",
          newsCategory: "優惠",
          newsState:true,
        },
      ],
    };
  },
  components: {},
  mounted() {},
};
</script>
