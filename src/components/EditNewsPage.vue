<template>
    <main class="newsPage">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <router-link to="/news">最新消息管理</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">編輯消息</li>
      </ol>
    </nav>
    <div class="titleGroup pb-5">
      <h1>編輯消息</h1>
      <form method="post" enctype="multipart/form-data" @submit.prevent="submitForm">
        <div class="wrapper">
          <div class="text">
            <div class="title">
              <label for="newsTitle"><span>消息標題</span></label>
              <input v-model="editedData.news_title" type="text" name="news_title" id="newsTitle" class="form-check-input rounded border border-1 border-gray" placeholder="請輸入最新消息標題">
            </div>
            <div class="date">
              <label for="newsDate"><span>消息發佈時間</span></label>
              <input v-model="editedData.news_date" type="datetime-local" name="news_date" id="newsDate" class="form-check-input rounded border border-1 border-gray">
            </div>
            <div class="content">
              <label for="newsContent"><span>消息內容</span></label>
              <textarea v-model="editedData.news_content" name="news_content" id="newsContent" cols="10" rows="20" class=" rounded border border-1 border-gray" placeholder="請輸入最新消息內容" ></textarea>
            </div>
          </div>
          <div class="imgContent">
            <div class="img">
                <label for="newsImg">
                    <img v-if="show" class="selectImg" :src="editedData.news_image" alt="upload-image">
                    <!-- <img v-if="show" class="originalImg" src="../assets/images/default_img/logo_white.svg" alt="original-image" > -->
                </label>
                <span v-show="!imgSrc" class="upload">{{imgText}} </span>
              <input type="file" name="news_image" id="newsImg" accept="image/png, image/jpeg" @change="selectImage">
            </div>
            <div class="category">
              <select v-model="editedData.news_category" id="newsCategory" class="rounded border border-1 border-gray">
                <option value="0"><span>-- 請選擇消息分類 --</span></option>
                <option value="桌遊">桌遊</option>
                <option value="活動">活動</option>
                <option value="限時">限時</option>
              </select>
            </div>
          </div>
        </div>
        <div class="btnArea">
          <div @click="saveChange" class="addBtn">
          <button type="submit" class="btn btn-info">
            <i class="fa-solid fa-plus"></i>儲存消息
          </button>
          </div>
          <div @click="cancelEdit" class="cancelBtn">
          <button type="button" class="btn btn-outline-secondary">
            取消
          </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      imgSrc:'',
      imgText:'點擊更改圖片',
      show: true,
      file: null,
      editedData: { ...this.data }, //將this.data的資料值複製到新的對象editDate中，屬於淺拷貝
    };
  },
  props: {
    data: Object,
  },
  methods:{
    getPhpUrl(path) {
      const url = `http://localhost/GridIsland/admin/${path}`;
      console.log('Generated URL:', url);
      return url; //本機端
      // return `https://tibamef2e.com/chd104/g5/php/admin/${path}`; //上線端
    },
    cancelEdit() {
      this.$emit('closeTab');
    },
    selectImage(e) {
      const file = e.target.files[0];
      if (file) {
        // 使用 FileReader 將圖片轉換成 data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imgSrc = e.target.result;
        };
        reader.readAsDataURL(file);
        this.file = file; // 將檔案存儲在 this.file 中
// ----------------------------------
      }else {
        this.imgSrc = 'src/assets/images/default_img/logo_white.svg';
      }
      this.show = false;
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('news_title', this.editedData.news_title);
      formData.append('news_date', new Date(this.editedData.news_date).toISOString()); //將日期轉換為ISO格式
      formData.append('news_content', this.editedData.news_content);
      // formData.append('news_image', this.file);
      formData.append('news_category', this.editedData.news_category);
      // formData.append('news_state', this.editedData.news_state);
      await this.saveChange();
    },
    async saveChange() {
      try {
        await axios.post(this.getPhpUrl('updateNews.php'), this.editedData);
        this.$emit('update', this.editedData);
      } catch (error) {
        console.error('發生錯誤:', error);
      }
    },

    reloadPage() {
      location.reload();
    },
  },
  created() {
    // 檢查php路徑正確與否使用
    console.log(this.getPhpUrl('updateNews.php'));
  },
  watch: {
    data(newValue) {
      this.editedData = { ...newValue };//將newValue的資料值複製到新的對象editDate中
    },
  },

};


</script>