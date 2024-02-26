<template>
  <main class="product" ref="productListContainer">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">商品管理</li>
      </ol>
    </nav>
    <div class="titleGroup pb-5">
      <h1>商品管理</h1>
      <div class="stateFilter">
        <span class="pointer" @click="filter('all')">全部({{ allProd }})</span>
        <span class="pointer" @click="filter('processed')"
          >已上架({{ pProd }})</span
        >
        <span class="pointer" @click="filter('unprocessed')"
          >未上架({{ upProd }})</span
        >
        <span class="pointer" @click="filter('discount')"
          >促銷中({{ disProd }})</span
        >
      </div>
      <div class="searchGroup">
        <select
          id="searchFilter"
          v-model="searchFilter"
          class="rounded border border-1 border-dark"
        >
          <option value="prodId">商品編號</option>
          <option value="prodName">商品名稱</option>
        </select>
        <input
          type="text"
          id="searchBar"
          placeholder="請輸入查詢資料"
          @input="handleSearch"
          v-model="searchBar"
          class="rounded border border-1 border-dark"
        />
      </div>
    </div>
    <div class="addProductBtn" @click="add">
      <button type="button" class="btn btn-info">
        <i class="fa-solid fa-plus"></i>新增商品
      </button>
    </div>
    <div class="prodTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-left">
            <th scope="col" class="pointer" @click="sortId">
              商品編號<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col">商品圖片</th>
            <th scope="col">商品名稱</th>
            <th scope="col" class="pointer text-center" @click="sortPrice">
              商品原價<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col" class="pointer text-center" @click="sortDisPrice">
              商品特價<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col" class="text-center">商品狀態</th>
            <th scope="col" class="text-center">編輯商品</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in currentProducts"
            class="border-bottom text-left align-middle"
          >
            <th class="pb-3 pt-3 text-center number text-center">
              {{ item.prod_id }}
            </th>
            <td>
              <img
                :src="`http://localhost/image/prod/${item.prod_img1}`"
                :alt="item.prod_name"
                class="rounded img"
              />
            </td>
            <td class="name">{{ item.prod_name }}</td>
            <td class="text-center">$ {{ item.prod_price }}</td>
            <td class="text-center">
              <span v-if="item.prod_discount_price"
                >$ {{ item.prod_discount_price }}</span
              ><span v-else>無特價</span>
            </td>
            <td class="text-center">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  role="switch"
                  type="checkbox"
                  :name="item.prod_id"
                  :id="item.prod_id"
                  :checked="item.prod_state == 1"
                  @change="updateProdState(item)"
                />
                <label class="form-check-label" :for="item.prod_id"></label>
              </div>
              <div class="prodState">
                <span v-if="item.prod_state == 1">已上架</span>
                <span v-else>未上架</span>
              </div>
            </td>
            <td class="text-center">
              <button
                @click="openEditor(item.prod_id)"
                type="button"
                class="btn btn-info"
              >
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
    <prodPage v-if="showAdd" @closeTab="handleEditorClosed" />
    <editProdPage
      v-if="showEdit"
      @closeTab="handleEditorClosed"
      :data="selectedProd"
    />
  </main>
</template>
<script>
import axios from "axios";
import prodPage from "../components/ProdPage.vue";
import editProdPage from "../components/EditProdPage.vue";

export default {
  data() {
    return {
      productResData: [],
      productDisData: [],
      allProd: 0,
      pProd: 0,
      upProd: 0,
      disProd: 0,
      searchFilter: "prodId",
      searchBar: "",
      sortIdMethod: "asc",
      sortPriceMethod: "",
      sortDisPriceMethod: "",
      showAdd: false,
      showEdit: false,
      selectedProd: null,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  components: {
    prodPage,
    editProdPage,
  },
  created() {
    this.fetchProd();
  },
  methods: {
    fetchProd() {
      axios
        .post(`${import.meta.env.VITE_API_URL}/getProduct.php`)
        .then((res) => {
          this.productResData = res.data.products;
          this.productDisData = res.data.products;
          this.allProd = res.data.allProd["count(*)"];
          this.pProd = res.data.pProd["count(*)"];
          this.upProd = res.data.upProd["count(*)"];
          this.disProd = res.data.disProd["count(*)"];
        });
    },
    updateProdState(item) {
      const isChecked = item.prod_state == 0 ? 1 : 0;
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/updateProdState.php`,
          {
            prodId: item.prod_id,
            isChecked,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          item.prod_state = isChecked;
          this.fetchProd();
        });
    },
    filter(type) {
      switch (type) {
        case "all":
          this.productDisData = this.productResData;
          break;
        case "processed":
          this.productDisData = this.productResData.filter((item) => {
            return item.prod_state == 1;
          });
          break;
        case "unprocessed":
          this.productDisData = this.productResData.filter((item) => {
            return item.prod_state == 0;
          });
          break;
        case "discount":
          this.productDisData = this.productResData.filter((item) => {
            return item.prod_discount_price;
          });
          break;
      }
    },
    handleSearch() {
      if (this.searchFilter == "prodId") {
        if (this.searchBar) {
          this.productDisData = this.productResData.filter((item) => {
            return item.prod_id == this.searchBar;
          });
        } else {
          this.productDisData = this.productResData;
        }
      } else if (this.searchFilter == "prodName") {
        this.productDisData = this.productResData.filter((item) => {
          return item.prod_name.includes(this.searchBar);
        });
      }
    },
    sortId() {
      if (this.sortIdMethod == "asc") {
        this.productDisData = this.productDisData.sort((a, b) => {
          return b.prod_id - a.prod_id;
        });
        this.sortIdMethod = "desc";
        this.sortPriceMethod = "";
        this.sortDisPriceMethod = "";
      } else if (this.sortIdMethod == "desc" || this.sortIdMethod == "") {
        this.productDisData = this.productDisData.sort((a, b) => {
          return a.prod_id - b.prod_id;
        });
        this.sortIdMethod = "asc";
        this.sortPriceMethod = "";
        this.sortDisPriceMethod = "";
      }
    },
    sortPrice() {
      if (this.sortPriceMethod == "asc") {
        this.productDisData = this.productDisData.sort((a, b) => {
          return b.prod_price - a.prod_price;
        });
        this.sortPriceMethod = "desc";
        this.sortIdMethod = "";
        this.sortDisPriceMethod = "";
      } else if (this.sortPriceMethod == "desc" || this.sortPriceMethod == "") {
        this.productDisData = this.productDisData.sort((a, b) => {
          return a.prod_price - b.prod_price;
        });
        this.sortPriceMethod = "asc";
        this.sortIdMethod = "";
        this.sortDisPriceMethod = "";
      }
    },
    sortDisPrice() {
      if (this.sortDisPriceMethod == "asc") {
        this.productDisData = this.productDisData.sort((a, b) => {
          if (
            (a.prod_discount_price == null || a.prod_discount_price == 0) &&
            (b.prod_discount_price == null || b.prod_discount_price == 0)
          ) {
            return 0; // 兩者都是 null，視為相等
          }
          if (a.prod_discount_price == null || a.prod_discount_price == 0) {
            return 1; // a 為 null，排在 b 之後
          }
          if (b.prod_discount_price == null || b.prod_discount_price == 0) {
            return -1; // b 為 null，排在 a 之後
          }
          return b.prod_discount_price - a.prod_discount_price;
        });
        this.sortDisPriceMethod = "desc";
      } else if (
        this.sortDisPriceMethod == "desc" ||
        this.sortDisPriceMethod == ""
      ) {
        this.productDisData = this.productDisData.sort((a, b) => {
          if (
            (a.prod_discount_price == null || a.prod_discount_price == 0) &&
            (b.prod_discount_price == null || b.prod_discount_price == 0)
          ) {
            return 0; // 兩者都是 null，視為相等
          }
          if (a.prod_discount_price == null || a.prod_discount_price == 0) {
            return 1; // a 為 null，排在 b 之後
          }
          if (b.prod_discount_price == null || b.prod_discount_price == 0) {
            return -1; // b 為 null，排在 a 之後
          }
          return a.prod_discount_price - b.prod_discount_price;
        });
        this.sortDisPriceMethod = "asc";
      }
    },
    // ------------------打開新增商品燈箱
    add() {
      this.showAdd = true;
    },
    handleEditorClosed() {
      this.showAdd = false;
      this.showEdit = false;
    },
    // ------------------打開個別編輯商品燈箱
    getProdById(prodId) {
      if (this.productDisData && this.productDisData.length > 0) {
        return this.productDisData.find((prod) => prod.prod_id === prodId);
      }
      return null;
    },
    openEditor(prodId) {
      const selectedProd = this.getProdById(prodId);
      if (selectedProd) {
        this.selectedProd = selectedProd;
        this.showEdit = true;
      } else {
        console.error(`找不到 id 為 ${prodId} 的商品`);
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.scrollToTop();
    },
    nextPrevPage(method) {
      if (method == "prev") {
        this.currentPage -= 1;
      } else {
        this.currentPage += 1;
      }
      this.scrollToTop();
    },
    scrollToTop() {
      const productListContainer = this.$refs.productListContainer;
      // 確保 productListContainer 不為空
      if (productListContainer) {
        // 使用 scrollIntoView 方法將商品列表的頂部滾動到最上面
        productListContainer.scrollIntoView({
          behavior: "smooth", // 讓滾動具有平滑效果
        });
      }
    },
  },
  computed: {
    nodata() {
      return this.productDisData.length == 0;
    },
    totalPages() {
      return Math.ceil(this.productDisData.length / this.itemsPerPage);
    },
    currentProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.productDisData.slice(start, end);
    },
  },
};
</script>
