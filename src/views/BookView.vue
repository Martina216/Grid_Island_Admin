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
        <select id="searchFilter" class="rounded border border-1 border-dark"
        v-model="searchSelect"
          @change="searching">
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
          <tr v-for="book in displayBookdata" class="border-bottom text-center">
            <th class="pb-3 pt-3">{{ book.book_id }}</th>
            <td>{{ book.mem_id }}</td>
            <td>{{ book.mem_name }}</td>
            <td>{{ book.book_date}}</td>
            <td>{{ book.book_time }}</td>
            <td>{{ book.book_people }}</td>
            <td>{{ book.table_type_name }}</td>
            <td>
              <select name="" id="" class="form-select form-select-sm" aria-label="Small select example" v-model="book.book_state" @change="deliverBook()">
                <option value="0">已取消</option>
                <option value="1">未到場</option>
                <option value="2">已到場</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      booksData: [],//預訂資料
      displayBookdata:[], //複製預訂資料展示用
      searchBar:"",//輸入框
      searchSelect:"bookId", //預設搜尋選擇的是訂單編號
    };
  },
  components: {},
  created(){
    this.fetchbooks();
  },
  mounted() {},
  methods: {
    fetchbooks() {
      axios
      .post(`${import.meta.env.VITE_API_URL}/getbook.php`, {})
      .then(res => {
        this.booksData = res.data.books;
        this.displayBookdata = res.data.books;
        // console.log(this.displayBookdata);
      })
      .catch(error => console.error('發生錯誤:',error))
    },
    searching(){
      //預約的訂單
      //filter可用來遍歷booksData裡的所有東西
        if(this.searchSelect=="bookId"){
          if(this.searchBar){
            this.displayBookdata = this.booksData.filter(book => {
          // 根據輸入的預約編號進行搜尋
          return book.book_id.toString().includes(this.searchBar.trim());
          //toString將預訂編號轉換為字串，因為 includes() 方法只能用於字串。
          //includes檢查預訂編號是否包含在搜尋欄 (searchBar) 中。
          });
        }else{
          this.displayBookdata = this.booksData;
        }

      }else if(this.searchSelect=="memId"){
        if (this.searchBar) {
          this.displayBookdata = this.booksData.filter(book => {
          // 根據輸入的預約編號進行搜尋
          return book.mem_id.toString().includes(this.searchBar.trim());
          //toString將預訂編號轉換為字串，因為 includes() 方法只能用於字串。
          //includes檢查預訂編號是否包含在搜尋欄 (searchBar) 中。
          });
        }else{
          this.displayBookdata = this.booksData;
        }

      }

      },
    deliverBook(){},

  }
};
</script>
<style lang="scss">
//
</style>