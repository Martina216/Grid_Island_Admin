<template>
  <main class="prodPage">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <router-link to="/product">商品管理</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">新增商品</li>
      </ol>
    </nav>
    <div class="mainTitle pb-5">
      <h1>新增商品</h1>
      <form
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="submitForm"
      >
        <div class="wrapper">
          <div class="text">
            <div class="title">
              <label for="prodName"><span>商品名稱</span></label>
              <input
                v-model="formData.prod_name"
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
                v-model="formData.prod_brief"
                name="prod_brief"
                id="prodBrief"
                cols="10"
                rows="5"
                class="form-check-input rounded border border-1 border-gray"
                placeholder="請輸入商品短語簡介"
              ></textarea>
            </div>
            <div class="productTag">
              <span>商品標籤</span>
              <div class="ppl">
                <span>人數</span>
                <input type="radio" name="gamePpl" id="underFour" v-model="formData.tags.ppl" value="7" />
                <label for="underFour">2-4人</label>
                <input type="radio" name="gamePpl" id="underEig" v-model="formData.tags.ppl" value="8" />
                <label for="underEig">5-8人</label>
                <input type="radio" name="gamePpl" id="overEig" v-model="formData.tags.ppl" value="9" />
                <label for="overEig">8人以上</label>
              </div>
              <div class="category">
                <span>種類</span>
                <input type="radio" name="category" id="easy" v-model="formData.tags.category" value="1"/>
                <label for="easy">策略</label>
                <input type="radio" name="category" id="mid" v-model="formData.tags.category" value="2"/>
                <label for="mid">紙牌</label>
                <input type="radio" name="category" id="hard" v-model="formData.tags.category" value="3"/>
                <label for="hard">經營</label>
              </div>
              <div class="diff">
                <span>難度</span>
                <input type="radio" name="diff" id="strategy" v-model="formData.tags.diff" value="4"/>
                <label for="strategy">簡單</label>
                <input type="radio" name="diff" id="paperGame" v-model="formData.tags.diff" value="5"/>
                <label for="paperGame">中等</label>
                <input type="radio" name="diff" id="business" v-model="formData.tags.diff" value="6"/>
                <label for="business">困難</label>
              </div>
            </div>
            <div class="content">
              <label for="prodIntro"><span>介紹與內容</span></label>
              <textarea
                v-model="formData.prod_intro"
                name="prod_intro"
                id="prodIntro"
                cols="10"
                rows="12"
                class="form-check-input rounded border border-1 border-gray"
                placeholder="請輸入商品介紹與遊玩方法"
              ></textarea>
            </div>
            <div class="device">
              <label for="prodDesc"><span>產品說明</span></label>
              <textarea
                v-model="formData.prod_desc"
                name="prod_desc"
                id="prodDesc"
                cols="10"
                rows="10"
                class="form-check-input rounded border border-1 border-gray"
                placeholder="請輸入產品說明"
              ></textarea>
            </div>
            <div class="date">
              <label for="prodDate"><span>發佈時間</span></label>
              <input
                v-model="formData.prod_date"
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
                    class="originalImg"
                    src="../assets/images/default_img/logo_white.svg"
                    alt="original-image"
                  />
                  <img
                    v-else="showMain"
                    class="selectImg"
                    :src="imgSrcMain"
                    alt="upload-image"
                  />
                </label>
              <span v-show="!imgSrcMain" class="upload">{{ imgTextMain }} </span>
              <input
                type="file"
                name="prod_img1"
                id="prodImg1"
                accept="image/png, image/jpeg, image/webp"
                @change="selectImageMain" />
            </div>
            <div class="small_image" title="請選擇 2 張商品細節圖">
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
                  </div>
                  <div class="image3">
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
                  </div>
                </label>
              <div class="text"><span v-show="!imgSrc2" class="upload">{{ imgText }} </span></div>
            </div>
            <div class="priceArea">
              <div class="price">
                <label for="prodPrice"><span>價格</span></label>
                <input
                  type="number"
                  name="prod_price"
                  id="prodPrice"
                  min="300"
                  class="form-check-input rounded border border-1 border-gray"
                  placeholder="輸入價格"
                  v-model="formData.prod_price"
                />
              </div>
              <div class="DisPrice">
                <label for="prodDiscountPrice"><span>特價</span></label>
                <input
                  type="number"
                  name="prod_discount_price"
                  id="prodDiscountPrice"
                  min="300"
                  class="form-check-input rounded border border-1 border-gray"
                  placeholder="選填"
                  v-model="formData.prod_discount_price"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="btnArea">
          <div class="addBtn">
            <button type="submit" class="btn btn-info">
              <i class="fa-solid fa-plus"></i>新增商品
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
import axios from "axios";

export default {
  data() {
    return {
      imgSrcMain:'',
      imgSrc: '',
      imgSrc2: '',
      imgTextMain: "點擊新增商品首圖",
      imgText: "點擊新增商品細節圖",
      show: true,
      showMain:true,
      formData: {
        prod_name: "",
        prod_intro: "",
        prod_price: "",
        prod_discount_price: "",
        prod_date: "",
        prod_desc: "",
        prod_brief: "",
        prod_state: "",
        tags:{
          ppl:0,
          diff:0,
          category:0,
        },
      },
      fileMain: null,
      file: null,
    };
  },
  methods: {
    getPhpUrl(path) {
      const url = `${import.meta.env.VITE_API_URL}/${path}`;
      console.log("Generated URL:", url);
      return url;
    },
    cancelAdd() {
      this.clearForm();
      this.$emit("closeTab");
    },
    clearForm() {
      this.formData = {
        prod_name: "",
        prod_intro: "",
        prod_price: "",
        prod_discount_price: "",
        prod_date: "",
        prod_desc: "",
        prod_brief: "",
        prod_state: "",
        tags:{
          ppl:0,
          diff:0,
          category:0,
        },
      };
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
              this.file1 = files[i];
            } else if (i === 1) {
              this.imgSrc2 = e.target.result;
              this.file2 = files[i];
            }
        }
        reader.readAsDataURL(files[i]);
      }
      this.file1 = files[0];
      this.file2 = files[1]; 
      console.log(this.file1, this.file2);
      this.show = false;  
    },
    submitForm() {
      const formData = new FormData();
      formData.append("prod_name", this.formData.prod_name);
      formData.append(
        "prod_date",
        new Date(this.formData.prod_date).toISOString()
      ); //將日期轉換為ISO格式
      formData.append("prod_intro", this.formData.prod_intro);
      formData.append("prod_brief", this.formData.prod_brief);
      formData.append("prod_discount_price", this.formData.prod_discount_price);
      formData.append("prod_price", this.formData.prod_price);
      formData.append("prod_img3", this.fileMain);
      formData.append("prod_img1", this.file1);
      formData.append("prod_img2", this.file2);
      formData.append("prod_desc", this.formData.prod_desc);
      formData.append("prod_state", this.formData.prod_state);
      formData.append("ppl", this.formData.tags.ppl);    
      formData.append("diff", this.formData.tags.diff);    
      formData.append("category", this.formData.tags.category);    

      axios
        .post(this.getPhpUrl("insertProd.php"), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.msg);
        })
        .then((result) => {
          this.$emit("closeTab");
          this.reloadPage();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    reloadPage() {
      location.reload();
    },
  },
  created() {
    //檢查php路徑正確與否使用
    // this.action = this.getPhpUrl("insertProd.php");
    // console.log(this.action);
  },
};
</script>
