<template>
  <main class="cuppon">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">優惠碼管理</li>
      </ol>
    </nav>
    <div class="titleGroup pb-5">
      <h1>優惠碼管理</h1>
      <div class="searchGroup">
        <select
          id="searchFilter"
          v-model="searchFilter"
          class="rounded border border-1 border-dark"
        >
          <option value="promoId">優惠碼序號</option>
          <option value="promoDetail">優惠碼說明</option>
        </select>
        <input
          type="text"
          id="searchBar"
          v-model="searchBar"
          placeholder="請輸入查詢資料"
          class="rounded border border-1 border-dark"
          @input="handleSearch"
        />
      </div>
    </div>
    <div class="addProductBtn" @click="add">
      <button type="button" class="btn btn-info">
        <i class="fa-solid fa-plus"></i>新增優惠碼
      </button>
    </div>
    <div class="prodTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-left text-center">
            <th scope="col" @click="sortId" class="pointer">
              編號<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col">優惠碼序號</th>
            <th scope="col">優惠碼說明</th>
            <th scope="col" class="pointer" @click="sortStartTime">
              使用開始日期<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col" class="pointer" @click="sortEndTime">
              使用結束日期<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col">優惠碼狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in promoDisData"
            class="border-bottom text-left align-middle text-center"
          >
            <th class="pb-3 pt-3 text-center number">{{ item.promo_id }}</th>
            <td class="cupponCode">{{ item.promo_code }}</td>
            <td class="detail">{{ item.promo_detail }}</td>
            <td class="date">
              {{ item.promo_start_date }}
            </td>
            <td class="date">
              {{ item.promo_end_date }}
            </td>
            <td class="state">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  role="switch"
                  type="checkbox"
                  :name="item.promo_id"
                  :id="item.promo_id"
                  :checked="item.promo_state == 1"
                  @change="updatePromoState(item)"
                />
                <label class="form-check-label" :for="item.promo_id"></label>
              </div>
              <span v-if="item.promo_state == 1">已啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button
                type="button"
                @click="openEditor(item)"
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
    <CouponPage v-if="showAdd" @closeTab="handleClose" />
    <EditCoupon v-if="showEdit" :data="selectedPromo" @closeTab="handleClose" />
  </main>
</template>
<script>
import axios from "axios";
import CouponPage from "../components/CouponPage.vue";
import EditCoupon from "../components/EditCouponPage.vue";
export default {
  data() {
    return {
      promoData: [],
      promoDisData: [],
      selectedPromo: [],
      showAdd: false,
      showEdit: false,
      searchFilter: "promoId",
      searchBar: "",
      sortIdMethod: "asc",
      sortStartTimeMethod: "",
      sortEndTimeMethod: "",
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  components: { CouponPage, EditCoupon },
  created() {
    this.fetchCode();
  },
  computed: {
    nodata() {
      return this.promoDisData.length == 0;
    },
    totalPages() {
      return Math.ceil(this.promoDisData.length / this.itemsPerPage);
    },
    currentProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.promoDisData.slice(start, end);
    },
  },
  methods: {
    fetchCode() {//抓資料
      axios.post(`${import.meta.env.VITE_API_URL}/getCode.php`).then((res) => {
        this.promoData = res.data.promos;
        this.promoDisData = res.data.promos;
      });
    },
    updatePromoState(item) {//啟用或不啟用優惠碼
      const isChecked = item.promo_state == 1 ? 0 : 1;
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/updatePromoState.php`,
          {
            promoId: item.promo_id,
            isChecked,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          item.promo_state = isChecked;
        });
    },
    handleSearch() {//搜尋優惠碼
      if (this.searchFilter == "promoId") {
        if (this.searchBar) {
          this.promoDisData = this.promoData.filter((item) => {
            return item.promo_id == this.searchBar;
          });
        } else {
          this.promoDisData = this.promoData;
        }
      } else if (this.searchFilter == "promoDetail") {
        this.promoDisData = this.promoData.filter((item) => {
          return item.promo_detail.includes(this.searchBar);
        });
      }
    },
    sortId() {//搜尋ID
      if (this.sortIdMethod == "asc") {
        this.promoDisData = this.promoDisData.sort((a, b) => {
          return b.promo_id - a.promo_id;
        });
        this.sortIdMethod = "desc";
        this.sortStartTimeMethod = "";
        this.sortEndTimeMethod = "";
      } else if (this.sortIdMethod == "desc" || this.sortIdMethod == "") {
        this.promoDisData = this.promoDisData.sort((a, b) => {
          return a.promo_id - b.promo_id;
        });
        this.sortIdMethod = "asc";
        this.sortStartTimeMethod = "";
        this.sortEndTimeMethod = "";
      }
    },
    sortStartTime() {//排序開始時間
      if (this.sortStartTimeMethod == "asc") {
        this.promoDisData = this.promoDisData.sort((a, b) => {
          const aDate = new Date(a.promo_start_date);
          const bDate = new Date(b.promo_start_date);
          return bDate - aDate;
        });
        this.sortStartTimeMethod = "desc";
        this.sortEndTimeMethod = "";
        this.sortIdMethod = "";
      } else if (
        this.sortStartTimeMethod == "desc" ||
        this.sortStartTimeMethod == ""
      ) {
        this.promoDisData = this.promoDisData.sort((a, b) => {
          const aDate = new Date(a.promo_start_date);
          const bDate = new Date(b.promo_start_date);
          return aDate - bDate;
        });
        this.sortStartTimeMethod = "asc";
        this.sortEndTimeMethod = "";
        this.sortIdMethod = "";
      }
    },
    sortEndTime() {//排序結束時間
      if (this.sortEndTimeMethod == "asc") {
        this.promoDisData = this.promoDisData.sort((a, b) => {
          const aDate = new Date(a.promo_end_date);
          const bDate = new Date(b.promo_end_date);
          return bDate - aDate;
        });
        this.sortEndTimeMethod = "desc";
        this.sortIdMethod = "";
        this.sortStartTimeMethod = "";
      } else if (
        this.sortEndTimeMethod == "desc" ||
        this.sortEndTimeMethod == ""
      ) {
        this.promoDisData = this.promoDisData.sort((a, b) => {
          const aDate = new Date(a.promo_end_date);
          const bDate = new Date(b.promo_end_date);
          return aDate - bDate;
        });
        this.sortEndTimeMethod = "asc";
        this.sortIdMethod = "";
        this.sortStartTimeMethod = "";
      }
    },
    add() {//新增優惠碼的視窗
      this.showAdd = true;
    },
    handleClose() {//關閉優惠碼的視窗
      this.showAdd = false;
      this.showEdit = false;
    },
    openEditor(item) {//編輯優惠碼視窗
      if (item) {
        this.selectedPromo = item;
        console.log(this.selectedPromo);
        this.showEdit = true;
      }
    },
  },
  mounted() {},
};
</script>
