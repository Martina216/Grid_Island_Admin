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
        <li class="breadcrumb-item active" aria-current="page">新增消息</li>
      </ol>
    </nav>
    <div class="titleGroup pb-5">
      <h1>新增消息</h1>
      <form method="post" enctype="multipart/form-data" @submit.prevent="submitForm">
        <div class="wrapper">
          <div class="text">
            <div class="title">
              <label for="newsTitle"><span>消息標題</span></label>
              <input v-model="formData.news_title" type="text" name="news_title" id="newsTitle" class="form-check-input rounded border border-1 border-gray" placeholder="請輸入最新消息標題">
            </div>
            <div class="date">
              <label for="newsDate"><span>消息發佈時間</span></label>
              <input v-model="formData.news_date" type="datetime-local" name="news_date" id="newsDate" class="form-check-input rounded border border-1 border-gray">
            </div>
            <div class="content">
              <label for="newsContent"><span>消息內容</span></label>
              <textarea v-model="formData.news_content" name="news_content" id="newsContent" cols="10" rows="20" class=" rounded border border-1 border-gray" placeholder="請輸入最新消息內容" ></textarea>
            </div>
          </div>
          <div class="imgContent">
            <div class="img">
              <!-- <span>jj</span> -->
                <label for="newsImg">
                    <img v-if="!show" class="selectImg" :src="imgSrc" alt="upload-image">
                    <img v-if="show" class="originalImg" src="../assets/images/default_img/logo_white.svg" alt="original-image" >
                </label>
                <span v-show="!imgSrc" class="upload">{{imgText}} </span>
              <input type="file" name="news_image" id="newsImg" accept="image/png, image/jpeg" @change="selectImage">
            </div>
            <div class="category">
              <select v-model="formData.news_category" id="newsCategory" class="rounded border border-1 border-gray">
                <option value="0"><span>-- 請選擇消息分類 --</span></option>
                <option value="桌遊">桌遊</option>
                <option value="活動">活動</option>
                <option value="限時">限時</option>
              </select>
            </div>
          </div>
        </div>
        <div class="btnArea">
          <div class="addBtn">
          <button type="submit" class="btn btn-info">
            <i class="fa-solid fa-plus"></i>新增消息
          </button>
          </div>
          <div @click="cancelAdd" class="cancelBtn">
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
        imgText:'點擊上傳圖片',
        show: true,
        formData: {
        news_title: '',
        news_date: '',
        news_content: '',
        news_category: '',
        news_state: '',
        },
        file: null,
    };
  },
  methods:{
    getPhpUrl(path) {
      const url = `http://localhost/GridIsland/admin/${path}`;
      console.log('Generated URL:', url);
      return url; //本機端
      // return `https://tibamef2e.com/chd104/g5/php/admin/${path}`; //上線端
    },
    cancelAdd() {
      this.clearForm();
      this.$emit('closeTab');
    },
    clearForm() {
      this.formData = {
        news_title: '',
        news_date: '',
        news_content: '',
        news_category: '',
        news_state: '',
      };
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

    submitForm() {
      const formData = new FormData();
      formData.append('news_title', this.formData.news_title);
      formData.append('news_date', new Date(this.formData.news_date).toISOString()); //將日期轉換為ISO格式
      formData.append('news_content', this.formData.news_content);
      formData.append('news_image', this.file);
      formData.append('news_category', this.formData.news_category);
      formData.append('news_state', this.formData.news_state);

      axios.post(this.getPhpUrl('insertNews.php'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res.data);
        alert(res.data.msg);
      })
      .then(result =>{
        this.$emit('closeTab');
        this.reloadPage();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
    reloadPage() {
      location.reload();
    },
  },
  created() {
    //檢查php路徑正確與否使用
    this.action = this.getPhpUrl('insertNews.php');
    console.log(this.action);
  }

};


</script>