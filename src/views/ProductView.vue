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
        <span>全部(50)</span>
        <span>已上架(35)</span>
        <span>未上架(5)</span>
        <span>促銷中(10)</span>
      </div>
      <div class="searchGroup">
        <select id="searchFilter" class="rounded border border-1 border-dark">
          <option value="memId">商品編號</option>
          <option value="memName">商品名稱</option>
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
        <i class="fa-solid fa-plus"></i>新增商品
      </button>
    </div>
    <div class="prodTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-left">
            <th scope="col">商品編號</th>
            <th scope="col">商品圖片</th>
            <th scope="col">商品名稱</th>
            <th scope="col">商品原價</th>
            <th scope="col">商品特價</th>
            <th scope="col">商品狀態</th>
            <th scope="col">編輯商品</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in productData"
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
      productData: [],
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
          this.productData = res.data.products;
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
        });
    },
  },
};
</script>
