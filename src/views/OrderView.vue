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
        <span class="pointer" @click="filter('all')">全部({{ allOrd }})</span>
        <span class="pointer" @click="filter('processed')"
          >已處理({{ processedOrd }})</span
        >
        <span class="pointer" @click="filter('unprocessed')"
          >未處理({{ unprocessedOrd }})</span
        >
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
            v-for="(item, index) in ordDisplayData"
            :key="index"
            class="border-bottom text-center align-middle"
          >
            <th class="pb-3 pt-3 align-middle">{{ item.ord_id }}</th>
            <td>{{ item.ord_date }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  role="switch"
                  type="checkbox"
                  :name="item.ordId"
                  :id="item.ordId"
                  :checked="item.ord_state === 1"
                  @change="updateOrderState(item)"
                />
                <label class="form-check-label" :for="item.ordId"></label>
              </div>
              <div class="ordState">
                <span v-if="item.ord_state == 1">已處理</span>
                <span v-else>未處理</span>
              </div>
            </td>
            <td>{{ item.ord_payment }}</td>
            <td>{{ item.ord_name }}</td>
            <td>$ {{ item.ord_pay }}</td>
            <td>
              <textarea
                :disabled="item.editMode"
                :class="{ notAllow: item.editMode }"
                v-model="item.ord_note"
              ></textarea>
            </td>

            <td>
              <button
                @click="changeOrd(item)"
                type="button"
                class="btn btn-info"
                v-if="item.editMode"
              >
                <i class="fa-solid fa-pen-to-square"></i><span>編輯</span>
              </button>
              <button
                @click="saveOrdChange(item)"
                type="button"
                class="btn btn-info"
                v-else
              >
                <i class="fa-solid fa-pen-to-square"></i><span>儲存</span>
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
      sortIdMethod: "asc",
      searchBar: "",
      searchSelect: "ordId",
      ordData: [],
      ordDisplayData: [],
      ordNote: "",
      allOrd: 0,
      processedOrd: 0,
      unprocessedOrd: 0,
    };
  },
  components: {},
  created() {
    this.fetchOrder();
  },
  methods: {
    changeOrd(item) {
      item.editMode = !item.editMode;
    },
    saveOrdChange(item) {
      item.editMode = !item.editMode;
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/updateOrdNote.php`,
          {
            ordId: item.ord_id,
            ordNote: item.ord_note,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          console.log(res.data);
          alert("已修改完成");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sortId() {
      if (this.sortIdMethod == "desc") {
        this.ordDisplayData = this.ordDisplayData.sort((a, b) => {
          return a.ord_id - b.ord_id;
        });
        this.sortIdMethod = "asc";
      } else if (this.sortIdMethod == "asc") {
        this.ordDisplayData = this.ordDisplayData.sort((a, b) => {
          return b.ord_id - a.ord_id;
        });
        this.sortIdMethod = "desc";
      }
    },
    handleSearch() {
      if (this.searchSelect == "ordId") {
        if (this.searchBar) {
          this.ordDisplayData = this.ordData.filter((item) => {
            return item.ord_id == this.searchBar;
          });
        } else {
          this.ordDisplayData = this.ordData;
        }
      } else if (this.searchSelect == "ordName") {
        this.ordDisplayData = this.ordData.filter((item) => {
          return item.ord_name.includes(this.searchBar);
        });
      }
    },
    filter(type) {
      if (type == "all") {
        this.ordDisplayData = this.ordData;
      } else if (type == "processed") {
        this.ordDisplayData = this.ordData.filter((item) => {
          return item.ord_state == true;
        });
      } else if (type == "unprocessed") {
        this.ordDisplayData = this.ordData.filter((item) => {
          return item.ord_state == false;
        });
      }
    },
    fetchOrder() {
      axios
        .post(`${import.meta.env.VITE_API_URL}/getOrder.php`, {})
        .then((res) => {
          this.ordData = res.data.ords;
          this.ordDisplayData = res.data.ords;
          this.allOrd = res.data.allOrd["count(*)"];
          this.processedOrd = res.data.pOrd["count(*)"];
          this.unprocessedOrd = res.data.upOrd["count(*)"];
          this.ordData.forEach((ord) => {
            ord.editMode = true;
          });
        })
        .catch((error) => console.error("發生錯誤:", error));
    },
    updateOrderState(item) {
      const isChecked = item.ord_state == 0 ? 1 : 0;
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/updateOrdState.php`,
          {
            ordId: item.ord_id,
            isChecked,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          item.ord_state = isChecked;
          this.fetchOrder();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
};
</script>
