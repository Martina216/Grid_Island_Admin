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
    <div @click="add" class="addProductBtn">
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
            <th class="pb-3 pt-3 text-center number">{{ item.news_id }}</th>
            <td>
              <img :src="getImgUrl(item.news_image)" class="rounded img" />
            </td>
            <td class="name">{{ item.news_title }}</td>
            <td>{{ item.news_category }}
            </td>
            <td class="text-center">
              <div class="form-check form-switch">
                <input
                  class="form-check-input "
                  role="switch"
                  type="checkbox"
                  :name="item.newsId"
                  :id="item.newsId"
                  v-model="item.newsState"
                  :checked="item.news_state === 1"
                  @change="updateNewsState(item)"
                />
                <label class="form-check-label" :for="item.newsId"></label>
              </div>
              <div class="newsState">
                <span v-if="item.news_state">已發佈</span>
                <span v-else>未發佈</span>
              </div>
            </td>
            <td>
              <button @click="openEditor(item.news_id)" class="btn btn-info">
                <i class="fa-solid fa-pen-to-square"></i>編輯
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 新增文章燈箱 -->
    <NewsPage v-if="showAdd" @closeTab="handleEditorClosed" /> 
    <!-- 編輯文章燈箱 -->
    <editNews v-if="showEdit" :data="selectedNews" @closeTab="handleEditorClosed"
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
      showAdd: false,
      showEdit:false,
      selectedNews: null,
    };
  },
  components: {
    NewsPage,
    editNews,
  },
  mounted() {},
  methods:{
    add() {
      this.showAdd = true;
    },
    handleEditorClosed() {
      this.showAdd = false;
      this.showEdit = false;
    },
    getImgUrl(path) {
      return `http://localhost/GridIsland/images/news/${path}`; //本機端
    },
    getNewsById(newsId) {
      if (this.newsData && this.newsData.length > 0) {
        return this.newsData.find(news => news.news_id === newsId); //用最新消息 id 從 newsData 中找到對應的資訊
      }
      return null;
    },
    openEditor(newsId) {
      const selectedNews = this.getNewsById(newsId);
      if (selectedNews) {
        this.selectedNews = selectedNews;
        this.showEdit = true;
      } else {
        console.error(`找不到 id 為 ${newsId} 的新聞`);
      }
    },
    async fetchNews() {
      try {
        let url = `${import.meta.env.VITE_API_URL}/getNews.php`;
        console.log(url);
        const response = await axios.get(url, {});
        
        // 確保 response.data.news 是一個陣列
        this.newsData = Array.isArray(response.data.news) ? response.data.news : [];
      } catch (error) {
        console.error('發生錯誤:', error);
      }
    },
    getPhpUrl(path) {
      const url = `${import.meta.env.VITE_API_URL}/${path}`;
      console.log('Generated URL:', url);
      return url;
    },
    updateNewsState(item) {
      const isChecked = item.news_state == 0 ? 1 : 0; //切換狀態
        axios.post(this.getPhpUrl('updateNewsState.php'),
        { 
          newsId: item.news_id, 
          isChecked,
        }, {
          headers: { "Content-Type": "application/json" }
        })
        .then(res => {
          // 更新成功
          console.log(res.data);
          item.news_state = isChecked;
        })
        .catch(error => {
          console.error(error);
          // 恢復狀態，避免更新失敗
          item.isChecked = !item.isChecked;
        });
      }
  },
  created() {
    this.fetchNews();
  }
};
</script>
