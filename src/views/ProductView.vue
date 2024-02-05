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
            v-for="item in prodData"
            class="border-bottom text-left align-middle"
          >
            <th class="pb-3 pt-3 text-center number">{{ item.prodId }}</th>
            <td><img src="https://fakeimg.pl/60x60/200" class="rounded img" /></td>
            <td class="name" >{{ item.prodName }}</td>
            <td>$ {{ item.prodPrice }}</td>
            <td>$ {{ item.prodPrice }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input "
                  role="switch"
                  type="checkbox"
                  :name="item.ordId"
                  :id="item.ordId"
                  v-model="item.prodState"
                />
                <label class="form-check-label" :for="item.ordId"></label>
              </div>
              <div class="prodState">
                <span v-if="item.prodState">已上架</span>
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
export default {
  data() {
    return {
      prodData: [
        {
          prodId: 1,
          prodName: "蟲蟲沙",
          prodPrice: "300",
          prodState:false,
        },
        {
          prodId: 2,
          prodName: "阿瓦蟲",
          prodPrice: "400",
          prodState:true,
        },
        {
          prodId: 3,
          prodName: "貓與城之內豪華精裝版",
          prodPrice: "500",
          prodState:true,
        },
        {
          prodId: 4,
          prodName: "貓與地下城",
          prodPrice: "600",
          prodState:true,
        },
        {
          prodId: 5,
          prodName: "蟲蟲總動員",
          prodPrice: "700",
          prodState:true,
        },
      ],
    };
  },
  components: {},
  mounted() {},
};
</script>
