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
        @submit.prevent="updateProd"
      >
        <div class="wrapper">
          <div class="text">
            <div class="title">
              <label for="prodName"><span>商品名稱</span></label>
              <input
                v-model="editedData.prod_name"
                type="text"
                name="prod_name"
                id="prodName"
                class="form-check-input rounded border border-1 border-gray"
                placeholder="請輸入商品名稱"
              />
            </div>
            <div class="brief">
              <label for="prodBrief"><span>商品簡介</span></label>
              <textarea
                v-model="editedData.prod_brief"
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
              <label for="prodDate"><span>發佈時間</span></label>
              <input
                v-model="editedData.prod_date"
                type="datetime-local"
                name="prod_date"
                id="prodDate"
                class="form-check-input rounded border border-1 border-gray"
              />
            </div>
          </div>
          <div class="imgContent">
            <div class="img">
              <label for="prodImg1">
                <img
                  v-if="showMain"
                  class="selectImg"
                  :src="`http://localhost/image/prod/${editedData.prod_img1}`"
                  alt="upload-image"
                  />
                  <img
                  v-if="!showMain"
                  :src="imgSrcMain"
                  class="originalImg"
                  alt="original-image"
                />
              </label>
              <span v-show="!imgSrcMain" class="upload">{{ imgText }} </span>
              <input
                type="file"
                name="prod_img1"
                id="prodImg1"
                accept="image/png, image/jpeg, image/webp"
                @change="selectImageMain"
              />
            </div>
            <div class="small_image" title="點擊更改 2 張商品細節圖">
              <label for="prodImg2">
                <input
                  type="file"
                  name="prod_img2"
                  id="prodImg2"
                  accept="image/png, image/jpeg, image/webp"
                  @change="selectImages" multiple
                  />
                <div class="image2">
                  <img
                    v-if="show"
                    class="originalImg"
                    :src="`http://localhost/image/prod/${editedData.prod_img2}`"
                    alt="original-image"
                  />
                  <img
                    v-else="show"
                    class="selectImg"
                    :src="imgSrc"
                    alt="upload-image"
                  />
                 
                </div>
              <div class="image3">
                  <img
                    v-if="show"
                    class="originalImg"
                    :src="`http://localhost/image/prod/${editedData.prod_img3}`"
                    alt="original-image"
                  />
                  <img
                    v-else="show"
                    class="selectImg"
                    :src="imgSrc2"
                    alt="upload-image"
                  />
                <input
                  type="file"
                  name="prod_img3"
                  id="prodImg3"
                  accept="image/png, image/jpeg, image/webp"
                  @change="selectImage3"
                />
              </div>
            </label>

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
      imgSrcMain:'',
      imgSrc2: '',
      imgSrc:'',
      imgText: "點擊更改圖片",
      showMain:true,
      show: true,
      editedData: { ...this.data },
      requestData: [],
      fileMain: null,
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
    },
    selectImageMain(e) {
      const fileMain = e.target.files[0];
      if (fileMain) {
        // 使用 FileReader 將圖片轉換成 data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imgSrcMain = e.target.result;
        };
        reader.readAsDataURL(fileMain);
        this.fileMain = fileMain; // 將檔案存儲在 this.file 中
      } else {
        this.imgSrcMain = "src/assets/images/default_img/logo_white.svg";
      }
      this.showMain = false;
    },
    selectImages(e) {
      const files = e.target.files;
      const maxFiles = 2;

      if ( files.length > maxFiles) {
        alert(`最多只能選擇${maxFiles}個圖檔`);
        e.target.value = null;
      } else {
        console.log("已選擇的圖檔：", files);
      }

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (i === 0) {
              this.imgSrc = e.target.result;
              console.log(files[i]);
              this.file1 = files[i];
              // console.log(this.file1);
            } else if (i === 1) {
              this.imgSrc2 = e.target.result;
              this.file2 = files[i];
            }
        }
        reader.readAsDataURL(files[i]);
      }
      this.file1 = files[0];
      this.file2 = files[1]; 
      // console.log(this.file1, this.file2);
      this.show = false;  
    console.log(this.switchTag(this.editedData.tags.種類));
    },
    async updateProd() {
      try {
        console.log(this.file1);
        const formData = new FormData();
        formData.append("prod_id", this.editedData.prod_id);
        formData.append("prod_name", this.editedData.prod_name);
        formData.append(
          "prod_date",
          new Date(this.editedData.prod_date).toISOString()
        );
        formData.append("prod_intro", this.editedData.prod_intro);
        formData.append("prod_brief", this.editedData.prod_brief);
        formData.append("prod_discount_price", this.editedData.prod_discount_price);
        formData.append("prod_price", this.editedData.prod_price);
        formData.append("prod_desc", this.editedData.prod_desc);
        formData.append("prod_img3", this.fileMain);
        formData.append("prod_img2", this.file2);
        formData.append("prod_img1", this.file1);
        formData.append("ppl", this.switchTag(this.editedData.tags.人數));    
        formData.append("diff", this.switchTag(this.editedData.tags.難度));    
        formData.append("category", this.switchTag(this.editedData.tags.種類));    

        // console.log(formData.get("prod_img1"));

        const res = await axios.post(
          this.getPhpUrl("updateProd.php"),
          formData
        );
        console.log(res.data.test);
        // console.log(res.data);
        // alert("成功修改商品內容");
        alert(res.data.test);
      } catch (error) {
        console.error("發生錯誤:", error);
      }
      // this.reloadPage();
    },
    reloadPage() {
      location.reload();
    },
    switchTag(tag) {
      switch (tag) {
        case "策略":
          return 1;
        case "紙牌":
          return 2;
        case "經營":
          return 3;
        case "簡單":
          return 4;
        case "中等":
          return 5;
        case "困難":
          return 6;
        case "2~4人":
          return 7;
        case "5~8人":
          return 8;
        case ">8人":
          return 9;
      }
    },
  },
  created() {
    // 檢查php路徑正確與否使用
    // console.log(this.getPhpUrl("updateProd.php"));
  },
  watch: {
    data(newValue) {
      this.editedData = { ...newValue }; //將newValue的資料值複製到新的對象editDate中
    },
  },
};
</script>
