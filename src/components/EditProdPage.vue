<template>
  <main class="editProdPage">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <router-link to="/product">商品管理</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">編輯商品</li>
      </ol>
    </nav>
    <div class="mainTitle pb-5">
      <h1>編輯商品</h1>
      <form
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="updateNews"
      >
        <div class="wrapper">
          <div class="text">
            <div class="title">
              <label for="newsTitle"><span>商品名稱</span></label>
              <input
                v-model="editedData.prod_name"
                type="text"
                name="news_title"
                id="newsTitle"
                class="form-check-input rounded border border-1 border-gray"
                placeholder="請輸入商品名稱"
              />
            </div>
            <div class="brief">
              <label for="prodBrief"><span>商品簡介</span></label>
              <textarea
                name="prod_brief"
                id="prodBrief"
                cols="10"
                rows="5"
                class="rounded border border-1 border-gray"
                placeholder="請輸入商品短語簡介"
              ></textarea>
            </div>
            <div class="productTag">
              <span>商品標籤</span>
              <div class="ppl">
                <span>人數</span>
                <input
                  type="radio"
                  name="gamePpl"
                  id="underFour"
                  value="2-4人"
                  v-model="editedData.tags.人數"
                />
                <label for="underFour">2-4人</label>
                <input
                  type="radio"
                  name="gamePpl"
                  id="underEig"
                  value="5-8人"
                  v-model="editedData.tags.人數"
                />
                <label for="underEig">5-8人</label>
                <input
                  type="radio"
                  name="gamePpl"
                  id="overEig"
                  value=">8人"
                  v-model="editedData.tags.人數"
                />
                <label for="overEig">8人以上</label>
              </div>
              <div class="diff">
                <span>難度</span>
                <input
                  type="radio"
                  name="diff"
                  value="簡單"
                  id="easy"
                  v-model="editedData.tags.難度"
                />
                <label for="easy">簡單</label>
                <input
                  type="radio"
                  name="diff"
                  id="mid"
                  value="中等"
                  v-model="editedData.tags.難度"
                />
                <label for="mid">中等</label>
                <input
                  type="radio"
                  name="diff"
                  id="hard"
                  value="困難"
                  v-model="editedData.tags.難度"
                />
                <label for="hard">困難</label>
              </div>
              <div class="category">
                <span>種類</span>
                <input
                  type="radio"
                  name="category"
                  id="strategy"
                  value="策略"
                  v-model="editedData.tags.種類"
                />
                <label for="strategy">策略</label>
                <input
                  type="radio"
                  name="category"
                  id="paperGame"
                  value="紙牌"
                  v-model="editedData.tags.種類"
                />
                <label for="paperGame">紙牌</label>
                <input
                  type="radio"
                  name="category"
                  id="business"
                  value="經營"
                  v-model="editedData.tags.種類"
                />
                <label for="business">經營</label>
              </div>
            </div>
            <div class="content">
              <label for="prodIntro"><span>介紹與內容</span></label>
              <textarea
                v-model="editedData.prod_intro"
                name="prod_intro"
                id="prodIntro"
                cols="10"
                rows="12"
                class="rounded border border-1 border-gray"
                placeholder="請輸入商品介紹與遊玩方法"
              ></textarea>
            </div>
            <div class="device">
              <label for="prodDesc"><span>產品說明</span></label>
              <textarea
                v-model="editedData.prod_desc"
                name="prod_desc"
                id="prodDesc"
                cols="10"
                rows="10"
                class="rounded border border-1 border-gray"
                placeholder="請輸入產品說明"
              ></textarea>
            </div>
            <div class="date">
              <label for="newsDate"><span>發佈時間</span></label>
              <input
                v-model="editedData.prod_date"
                type="datetime-local"
                name="news_date"
                id="newsDate"
                class="form-check-input rounded border border-1 border-gray"
              />
            </div>
          </div>
          <div class="imgContent">
            <div class="img">
              <label for="prodImg1">
                <img
                  v-if="!show"
                  class="selectImg"
                  :src="imgSrc"
                  alt="upload-image"
                />
                <img
                  v-if="show"
                  class="originalImg"
                  src="../assets/images/default_img/logo_white.svg"
                  alt="original-image"
                />
              </label>
              <span v-show="!imgSrc" class="upload">{{ imgText }} </span>
              <input
                type="file"
                name="prod_img1"
                id="prodImg1"
                accept="image/png, image/jpeg"
                @change="selectImage1"
              />
            </div>
            <div class="small_image">
              <div class="image2">
                <label for="prodImg2">
                  <img
                    v-if="!show"
                    class="selectImg"
                    :src="imgSrc2"
                    alt="upload-image"
                  />
                  <img
                    v-if="show"
                    class="originalImg"
                    src="../assets/images/default_img/logo_white.svg"
                    alt="original-image"
                  />
                </label>
                <input
                  type="file"
                  name="prod_img2"
                  id="prodImg2"
                  accept="image/png, image/jpeg"
                  @change="selectImage2"
                />
              </div>
              <div class="image3">
                <label for="prodImg3">
                  <img
                    v-if="!show"
                    class="selectImg"
                    :src="imgSrc3"
                    alt="upload-image"
                  />
                  <img
                    v-if="show"
                    class="originalImg"
                    src="../assets/images/default_img/logo_white.svg"
                    alt="original-image"
                  />
                </label>
                <input
                  type="file"
                  name="prod_img3"
                  id="prodImg3"
                  accept="image/png, image/jpeg"
                  @change="selectImage3"
                />
              </div>
            </div>
            <div class="priceArea">
              <div class="price">
                <label for="prodPrice"><span>價格</span></label>
                <input
                  v-model="editedData.prod_price"
                  type="number"
                  name="prod_price"
                  id="prodPrice"
                  min="300"
                  class="form-check-input rounded border border-1 border-gray"
                  placeholder="輸入價格"
                />
              </div>
              <div class="DisPrice">
                <label for="prodDiscountPrice"><span>特價</span></label>
                <input
                  v-model="editedData.prod_discount_price"
                  type="number"
                  name="prod_discount_price"
                  id="prodDiscountPrice"
                  min="300"
                  class="form-check-input rounded border border-1 border-gray"
                  placeholder="選填"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="btnArea">
          <div class="addBtn">
            <button type="submit" class="btn btn-info">
              <i class="fa-solid fa-plus"></i>儲存商品
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
import axios from "axios";

export default {
  data() {
    return {
      imgSrc: "",
      imgText: "點擊更改圖片",
      show: true,
      file: null,
      editedData: { ...this.data },
      requestData: [],
      file: null,
    };
  },
  props: {
    data: Object,
  },
  methods: {
    getPhpUrl(path) {
      const url = `${import.meta.env.VITE_API_URL}/${path}`;
      console.log("Generated URL:", url);
      return url;
    },
    cancelEdit() {
      this.$emit("closeTab");
      this.clearForm();
    },
    clearForm() {
      this.formData = {
        news_title: "",
        news_date: "",
        news_content: "",
        news_category: "",
        news_state: "",
      };
    },
    selectImage1(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imgSrc = e.target.result;
        };
        reader.readAsDataURL(file);
        this.file = file;
      } else {
        this.imgSrc = "src/assets/images/default_img/logo_white.svg";
      }
      this.show = false;
    },
    selectImage2(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imgSrc2 = e.target.result;
        };
        reader.readAsDataURL(file);
        this.file = file;
      } else {
        this.imgSrc = "src/assets/images/default_img/logo_white.svg";
      }
      this.show = false;
    },
    selectImage3(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imgSrc3 = e.target.result;
        };
        reader.readAsDataURL(file);
        this.file = file;
      } else {
        this.imgSrc = "src/assets/images/default_img/logo_white.svg";
      }
      this.show = false;
    },
    async updateNews() {
      try {
        const formData = new FormData();

        formData.append("news_id", this.editedData.news_id);
        formData.append("news_title", this.editedData.news_title);
        formData.append(
          "news_date",
          new Date(this.editedData.news_date).toISOString()
        );
        formData.append("news_content", this.editedData.news_content);
        formData.append("news_image", this.file);
        formData.append("news_category", this.editedData.news_category);

        console.log(formData.get("news_image"));

        const res = await axios.post(
          this.getPhpUrl("updateNews.php"),
          formData
        );

        console.log(res.data);
        alert("成功修改商品內容");
      } catch (error) {
        console.error("發生錯誤:", error);
      }
      this.reloadPage();
    },
    reloadPage() {
      location.reload();
    },
  },
  created() {
    // 檢查php路徑正確與否使用
    console.log(this.getPhpUrl("updateNews.php"));
  },
  watch: {
    data(newValue) {
      this.editedData = { ...newValue }; //將newValue的資料值複製到新的對象editDate中
    },
  },
};
</script>
