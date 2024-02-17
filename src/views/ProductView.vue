<template>
  <main class="product">
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
    <div class="addProductBtn">
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
            <th scope="col" class="pointer" @click="sortPrice">
              商品原價<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col" class="pointer" @click="sortDisPrice">
              商品特價<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col">商品狀態</th>
            <th scope="col">編輯商品</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in productDisData"
            class="border-bottom text-left align-middle"
          >
            <th class="pb-3 pt-3 text-center number">{{ item.prod_id }}</th>
            <td>
              <img
                :src="`https://tibamef2e.com/chd104/g5/image/prod/${item.prod_img1}`"
                :alt="item.prod_name"
                class="rounded img"
              />
            </td>
            <td class="name">{{ item.prod_name }}</td>
            <td>$ {{ item.prod_price }}</td>
            <td>
              <span v-if="item.prod_discount_price"
                >$ {{ item.prod_discount_price }}</span
              ><span v-else>無特價</span>
            </td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  role="switch"
                  type="checkbox"
                  :name="item.ord_id"
                  :id="item.ord_id"
                  :checked="item.prod_state == 1"
                  @change="updateProdState(item)"
                />
                <label class="form-check-label" :for="item.ord_id"></label>
              </div>
              <div class="prodState">
                <span v-if="item.prod_state == 1">已上架</span>
                <span v-else>未上架</span>
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
import axios from "axios";

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
      sortPriceMethod: "asc",
      sortDisPriceMethod: "asc",
    };
  },
  components: {},
  mounted() {},
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
          return a.prod_id - b.prod_id;
        });
        this.sortIdMethod = "desc";
      } else if (this.sortIdMethod == "desc") {
        this.productDisData = this.productDisData.sort((a, b) => {
          return b.prod_id - a.prod_id;
        });
        this.sortIdMethod = "asc";
      }
    },
    sortPrice() {
      if (this.sortPriceMethod == "asc") {
        this.productDisData = this.productDisData.sort((a, b) => {
          return a.prod_price - b.prod_price;
        });
        this.sortPriceMethod = "desc";
      } else if (this.sortPriceMethod == "desc") {
        this.productDisData = this.productDisData.sort((a, b) => {
          return b.prod_price - a.prod_price;
        });
        this.sortPriceMethod = "asc";
      }
    },
    sortDisPrice() {
      if (this.sortDisPriceMethod == "asc") {
        console.log("hi");
        this.productDisData = this.productDisData.sort((a, b) => {
          if (
            a.prod_discount_price === null &&
            b.prod_discount_price === null
          ) {
            return 0; // 兩者都是 null，視為相等
          }
          if (a.prod_discount_price === null) {
            return 1; // a 為 null，排在 b 之後
          }
          if (b.prod_discount_price === null) {
            return -1; // b 為 null，排在 a 之後
          }
          return a.prod_discount_price - b.prod_discount_price;
        });
        this.sortDisPriceMethod = "desc";
      } else if (this.sortDisPriceMethod == "desc") {
        this.productDisData = this.productDisData.sort((a, b) => {
          if (
            a.prod_discount_price === null &&
            b.prod_discount_price === null
          ) {
            return 0; // 兩者都是 null，視為相等
          }
          if (a.prod_discount_price === null) {
            return 1; // a 為 null，排在 b 之後
          }
          if (b.prod_discount_price === null) {
            return -1; // b 為 null，排在 a 之後
          }
          return b.prod_discount_price - a.prod_discount_price;
        });
        this.sortDisPriceMethod = "asc";
      }
    },
  },
};
</script>
