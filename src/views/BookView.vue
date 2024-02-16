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
        <select id="searchFilter" class="rounded border border-1 border-dark">
          <option value="bookId">預訂編號</option>
          <option value="memId">會員編號</option>
        </select>
        <input
          type="text"
          id="searchBar"
          placeholder="請輸入編號"
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
          <tr v-for="book in booksData" class="border-bottom text-center">
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
      booksData: [],
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
        console.log(res.data.books);
        this.booksData = res.data.books;
      })
      .catch(error => console.error('發生錯誤:',error))
    },
    deliverBook(){
      
    }
  }
};
</script>
<style lang="scss">
//
</style>