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
        <span class="pointer" @click="filter('all')">全部({{ allCount }})</span>
        <span class="pointer" @click="filter('promotion')"
          >優惠({{ promotionCount }})</span
        >
        <span class="pointer" @click="filter('boardGame')"
          >桌遊({{ boardGameCount }})</span
        >
        <span class="pointer" @click="filter('activity')"
          >活動({{ activityCount }})</span
        >
      </div>
      <div class="searchGroup">
        <select
          id="searchFilter"
          v-model="searchFilter"
          @input="handleSearch"
          class="rounded border border-1 border-dark"
        >
          <option value="newsId">消息編號</option>
          <option value="newsName">消息標題</option>
        </select>
        <input
          type="text"
          id="searchBar"
          placeholder="請輸入查詢資料"
          class="rounded border border-1 border-dark"
          @input="handleSearch"
          v-model="searchBar"
        />
      </div>
    </div>
    <div @click="add" class="addProductBtn">
      <button type="button" class="btn btn-info">
        <i class="fa-solid fa-plus"></i>新增消息
      </button>
    </div>
    <div class="prodTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-left">
            <th scope="col" class="text-center pointer" @click="sortId">
              消息編號<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col">消息圖片</th>
            <th scope="col">消息標題</th>
            <th scope="col" class="text-center">消息分類</th>
            <th scope="col" class="text-center">消息狀態</th>
            <th scope="col" class="text-center">編輯消息</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in disData"
            class="border-bottom text-left align-middle"
          >
            <th class="pb-3 pt-3 text-center number">{{ item.news_id }}</th>
            <td>
              <!-- :src="`https://tibamef2e.com/chd104/g5/image/news/${item.news_image}`" -->
              <img
                :src="`http://localhost/image/news/${item.news_image}`"
                class="rounded img"
              />
            </td>
            <td class="name">{{ item.news_title }}</td>
            <td class="text-center">{{ item.news_category }}</td>
            <td class="text-center">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  role="switch"
                  type="checkbox"
                  :name="item.newsId"
                  :id="item.newsId"
                  v-model="item.newsState"
                  :checked="item.news_state == 1"
                  @change="updateNewsState(item)"
                />
                <label class="form-check-label" :for="item.newsId"></label>
              </div>
              <div class="newsState">
                <span v-if="item.news_state">已發佈</span>
                <span v-else>未發佈</span>
              </div>
            </td>
            <td class="text-center">
              <button @click="openEditor(item.news_id)" class="btn btn-info">
                <i class="fa-solid fa-pen-to-square"></i>編輯
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pageBtnList" v-if="!nodata">
      <button
        class="pageBtn pageBtncursor"
        @click="nextPrevPage('prev')"
        v-if="currentPage != 1"
      >
      <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button
        class="pageBtn"
        v-for="page in totalPages"
        :key="page"
        @click="currentPage !== page ? changePage(page) : null"
        :class="{
          pageBtncursor: currentPage != page,
          currPageBtn: currentPage == page,
        }"
      >
        {{ page }}
      </button>
      <button
        class="pageBtn pageBtncursor"
        @click="nextPrevPage('next')"
        v-if="currentPage != totalPages"
      >
      <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <div class="nodata" v-if="nodata">
      <span>查無資料</span>
    </div>

    <!-- 新增文章燈箱 -->
    <NewsPage v-if="showAdd" @closeTab="handleEditorClosed" />
    <!-- 編輯文章燈箱 -->
    <editNews
      v-if="showEdit"
      :data="selectedNews"
      @closeTab="handleEditorClosed"
    />
  </main>
</template>
<script>
import axios from "axios";
import NewsPage from "../components/NewsPage.vue";
import editNews from "../components/EditNewsPage.vue";

export default {
  data() {
    return {
      newsData: [],
      disData: [],
      showAdd: false,
      showEdit: false,
      selectedNews: null,
      allCount: 0,
      promotionCount: 0,
      activityCount: 0,
      boardGameCount: 0,
      searchFilter: "newsId",
      searchBar: "",
      sortIdMethod: "asc",
    };
  },
  components: {
    NewsPage,
    editNews,
  },
  mounted() {},
  computed: {
    nodata() {
      return this.disData.length == 0;
    },
  },
  methods: {
    add() {
      this.showAdd = true;
    },
    handleEditorClosed() {
      this.showAdd = false;
      this.showEdit = false;
    },
    getImgUrl(path) {
      return `${import.meta.env.VITE_API_URL}/${path}`; //本機端
    },
    getNewsById(newsId) {
      if (this.newsData && this.newsData.length > 0) {
        return this.newsData.find((news) => news.news_id === newsId); //用最新消息 id 從 newsData 中找到對應的資訊
      }
      return null;
    },
    openEditor(newsId) {
      const selectedNews = this.getNewsById(newsId);
      if (selectedNews) {
        this.selectedNews = selectedNews;
        this.showEdit = true;
      } else {
        // console.error(`找不到 id 為 ${newsId} 的新聞`);
        alert(`找不到 id 為 ${newsId} 的新聞`);
      }
    },
    async fetchNews() {
      try {
        let url = `${import.meta.env.VITE_API_URL}/getNews.php`;
        // console.log(url);
        const response = await axios.get(url, {});

        // 確保 response.data.news 是一個陣列
        this.newsData = Array.isArray(response.data.news)
        ? response.data.news
        : [];
        this.disData = response.data.news;
        this.allCount = response.data.allNewsCount;
        this.promotionCount = response.data.promotionCount;
        this.activityCount = response.data.activityCount;
        this.boardGameCount = response.data.boardGameCount;
      } catch (error) {
        // console.error("發生錯誤:", error);
        alert(`請聯繫系統管理員或維護單位`);
      }
    },
    getPhpUrl(path) {
      const url = `${import.meta.env.VITE_API_URL}/${path}`;
      // console.log("Generated URL:", url);
      return url;
    },
    updateNewsState(item) {
      const isChecked = item.news_state == 0 ? 1 : 0; //切換狀態
      axios
        .post(
          this.getPhpUrl("updateNewsState.php"),
          {
            newsId: item.news_id,
            isChecked,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          // 更新成功
          // console.log(res.data);
          item.news_state = isChecked;
        })
        .catch((error) => {
          // console.error(error);
          // 恢復狀態，避免更新失敗
          item.isChecked = !item.isChecked;
        });
    },
    filter(method) {
      switch (method) {
        case "all":
          this.disData = this.newsData;
          break;
        case "promotion":
          this.disData = this.newsData.filter((item) => {
            return item.news_category == "優惠";
          });
          break;
        case "boardGame":
          this.disData = this.newsData.filter((item) => {
            return item.news_category == "桌遊";
          });
          break;
        case "activity":
          this.disData = this.newsData.filter((item) => {
            return item.news_category == "活動";
          });
          break;
      }
    },
    handleSearch() {
      if (this.searchFilter == "newsId") {
        if (this.searchBar) {
          this.disData = this.newsData.filter((item) => {
            return item.news_id == this.searchBar;
          });
        } else {
          this.disData = this.newsData;
        }
      } else if (this.searchFilter == "newsName") {
        this.disData = this.newsData.filter((item) => {
          return item.news_title.includes(this.searchBar);
        });
      }
    },
    sortId() {
      if (this.sortIdMethod == "desc") {
        this.disData = this.disData.sort((a, b) => {
          return a.news_id - b.news_id;
        });
        this.sortIdMethod = "asc";
      } else if (this.sortIdMethod == "asc") {
        this.disData = this.disData.sort((a, b) => {
          return b.news_id - a.news_id;
        });
        this.sortIdMethod = "desc";
      }
    },
  },
  created() {
    this.fetchNews();
  },
};
</script>
