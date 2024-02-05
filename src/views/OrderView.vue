<template>
  <main class="order">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">訂單管理</li>
      </ol>
    </nav>
    <div class="titleGroup pb-5">
      <h1>訂單管理</h1>
      <div class="stateFilter">
        <span class="pointer" @click="filter('all')">全部(50)</span>
        <span class="pointer" @click="filter('processed')">已處理(35)</span>
        <span class="pointer" @click="filter('unprocessed')">未處理(5)</span>
      </div>
      <div class="searchGroup">
        <select
          id="searchFilter"
          class="rounded border border-1 border-dark"
          v-model="searchSelect"
          @change="handleSearch"
        >
          <option value="ordId">訂單編號</option>
          <option value="ordName">訂購人名稱</option>
        </select>
        <input
          type="text"
          id="searchBar"
          v-model="searchBar"
          placeholder="請輸入查詢資料"
          @input="handleSearch"
          class="rounded border border-1 border-dark"
        />
      </div>
    </div>
    <div class="prodTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-center">
            <th scope="col" @click="sortId" class="pointer">
              訂單編號<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col">下單時間</th>
            <th scope="col">訂單狀況</th>
            <th scope="col">付款方式</th>
            <th scope="col">訂購人</th>
            <th scope="col">金額</th>
            <th scope="col">備註</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in displayOrdData"
            class="border-bottom text-center align-middle"
          >
            <th class="pb-3 pt-3 align-middle">{{ item.ordId }}</th>
            <td>{{ item.ordTime }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  role="switch"
                  type="checkbox"
                  :name="item.ordId"
                  :id="item.ordId"
                  v-model="item.ordState"
                />
                <label class="form-check-label" :for="item.ordId"></label>
              </div>
              <div class="ordState">
                <span v-if="item.ordState">已處理</span>
                <span v-else>未處理</span>
              </div>
            </td>
            <td>{{ item.ordMethod }}</td>
            <td>{{ item.ordName }}</td>
            <td>$ {{ item.ordAmount }}</td>
            <td>
              <input type="text" id="note" class="rounded" :value="item.note" />
            </td>

            <td>
              <button
                @click="changeOrd(item.ordId)"
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
  </main>
</template>
<script>
export default {
  data() {
    return {
      ordData: [
        {
          ordId: 1,
          ordTime: "2023-12-30 15:28",
          ordState: false,
          ordMethod: "轉帳",
          ordName: "基德",
          ordAmount: 400,
          note: "無",
        },
        {
          ordId: 2,
          ordTime: "2024-10-02 10:55",
          ordState: true,
          ordMethod: "信用卡",
          ordName: "揍迪客",
          ordAmount: 800,
          note: "商品售罄，已通知訂購人",
        },
        {
          ordId: 3,
          ordTime: "2024-10-12 10:55",
          ordState: false,
          ordMethod: "轉帳",
          ordName: "古迪錐",
          ordAmount: 1600,
          note: "無",
        },
      ],
      displayOrdData: [
        {
          ordId: 1,
          ordTime: "2023-12-30 15:28",
          ordState: false,
          ordMethod: "轉帳",
          ordName: "基德",
          ordAmount: 400,
          note: "無",
        },
        {
          ordId: 2,
          ordTime: "2024-10-02 10:55",
          ordState: true,
          ordMethod: "信用卡",
          ordName: "揍迪客",
          ordAmount: 800,
          note: "商品售罄，已通知訂購人",
        },
        {
          ordId: 3,
          ordTime: "2024-10-12 10:55",
          ordState: false,
          ordMethod: "轉帳",
          ordName: "古迪錐",
          ordAmount: 1600,
          note: "無",
        },
      ],
      sortIdMethod: "asc",
      searchBar: "",
      searchSelect: "ordId",
    };
  },
  components: {},
  methods: {
    changeOrd(item) {
      console.log(item);
    },
    sortId() {
      if (this.sortIdMethod == "desc") {
        this.displayOrdData = this.displayOrdData.sort((a, b) => {
          return a.ordId - b.ordId;
        });
        this.sortIdMethod = "asc";
      } else if (this.sortIdMethod == "asc") {
        this.displayOrdData = this.displayOrdData.sort((a, b) => {
          return b.ordId - a.ordId;
        });
        this.sortIdMethod = "desc";
      }
    },
    handleSearch() {
      if (this.searchSelect == "ordId") {
        if (this.searchBar) {
          this.displayOrdData = this.ordData.filter((item) => {
            return item.ordId == this.searchBar;
          });
        } else {
          this.displayOrdData = this.ordData;
        }
      } else if (this.searchSelect == "ordName") {
        this.displayOrdData = this.ordData.filter((item) => {
          return item.ordName.includes(this.searchBar);
        });
      }
    },
    filter(type) {
      if (type == "all") {
        this.displayOrdData = this.ordData;
      } else if (type == "processed") {
        this.displayOrdData = this.ordData.filter((item) => {
          return item.ordState == true;
        });
      } else if (type == "unprocessed") {
        this.displayOrdData = this.ordData.filter((item) => {
          return item.ordState == false;
        });
      }
    },
  },
  mounted() {},
};
</script>
