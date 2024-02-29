<template>
  <div class="book">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">預約管理</li>
        <li class="breadcrumb-item active" aria-current="page">預約訂單</li>
      </ol>
    </nav>
    <div class="titleGroup">
      <h1>預約訂單</h1>
      <div class="searchGroup">
        <select
          id="searchFilter"
          class="rounded border border-1 border-dark"
          v-model="searchSelect"
          @change="searching"
        >
          <option value="bookId">預訂編號</option>
          <option value="memId">會員編號</option>
        </select>
        <input
          type="text"
          id="searchBar"
          v-model="searchBar"
          placeholder="請輸入編號"
          @input="searching"
          class="rounded border border-1 border-dark"
        />
      </div>
    </div>
    <div class="bookTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-center">
            <th scope="col">預訂編號</th>
            <th scope="col">會員編號</th>
            <th scope="col">會員姓名</th>
            <th scope="col">預定日期</th>
            <th scope="col">預定時段</th>
            <th scope="col">預定人數</th>
            <th scope="col">預定桌型</th>
            <th scope="col">預定狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(book, id) in currentBook"
            class="border-bottom text-center"
          >
            <th class="pb-3 pt-3">{{ book.book_id }}</th>
            <td>{{ book.mem_id }}</td>
            <td>{{ book.mem_name }}</td>
            <td>{{ book.book_date }}</td>
            <td>{{ book.book_time }}</td>
            <td>{{ book.book_people }}</td>
            <td>{{ book.table_type_name }}</td>
            <td>
              <select
                name=""
                id=""
                class="form-select form-select-sm"
                aria-label="Small select example"
                v-model="book.book_state"
                @change="deliverBook(id)"
              >
                <option value="0">已取消</option>
                <option value="1">未到場</option>
                <option value="2">已到場</option>
              </select>
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
    <div class="nodata" v-if="nodata"><span>查無資料</span></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      booksData: [], //預訂資料
      displayBookdata: [], //複製預訂資料展示用
      searchBar: "", //輸入框
      searchSelect: "bookId", //預設搜尋選擇的是訂單編號
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  created() {
    this.fetchbooks();
  },
  mounted() {},
  methods: {
    fetchbooks() {
      axios
        .post(`${import.meta.env.VITE_API_URL}/getbook.php`, {})
        .then((res) => {
          this.booksData = res.data.books;
          this.displayBookdata = res.data.books;
          // console.log(this.displayBookdata);
        })
        .catch((error) => console.error("發生錯誤:", error));
    },
    searching() {
      //預約的訂單
      //filter可用來遍歷booksData裡的所有東西
      if (this.searchSelect == "bookId") {
        if (this.searchBar) {
          this.displayBookdata = this.booksData.filter((book) => {
            // 根據輸入的預約編號進行搜尋
            return book.book_id.toString().includes(this.searchBar.trim());
            //toString將預訂編號轉換為字串，因為 includes() 方法只能用於字串。
            //includes檢查預訂編號是否包含在搜尋欄 (searchBar) 中。
          });
        } else {
          this.displayBookdata = this.booksData;
        }
      } else if (this.searchSelect == "memId") {
        if (this.searchBar) {
          this.displayBookdata = this.booksData.filter((book) => {
            // 根據輸入的預約編號進行搜尋
            return book.mem_id.toString().includes(this.searchBar.trim());
            //toString將預訂編號轉換為字串，因為 includes() 方法只能用於字串。
            //includes檢查預訂編號是否包含在搜尋欄 (searchBar) 中。
          });
        } else {
          this.displayBookdata = this.booksData;
        }
      }
    },
    deliverBook(id) {
      //修改預訂狀態
      console.log(this.booksData[id].book_state);
      console.log(this.booksData[id].book_id);
      axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/updateBookState.php`,
        headers: { "Content-Type": "multipart/form-data" },
        data: {
          book_id: this.booksData[id].book_id,
          book_state: this.booksData[id].book_state,
        },
      })
        .then((res) => {
          console.log(res.data);
          alert("已修改完成");
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
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
      return this.displayBookdata.length == 0;
    },
    totalPages() {
      return Math.ceil(this.displayBookdata.length / this.itemsPerPage);
    },
    currentBook() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.displayBookdata.slice(start, end);
    },
  },
};
</script>
<style lang="scss">
//
</style>
