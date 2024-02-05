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
          <tr v-for="book in bookData" class="border-bottom text-center">
            <th class="pb-3 pt-3">{{ book.bookId }}</th>
            <td>{{ book.memId }}</td>
            <td>{{ book.memName }}</td>
            <td>{{ book.bookDate }}</td>
            <td>{{ book.booktime }}</td>
            <td>{{ book.numOfPeople }}</td>
            <td>{{ book.tableType }}</td>
            <td>
              <select name="" id="" class="form-select form-select-sm" aria-label="Small select example" v-model="book.bookStatus">
                <option value="0">已預定</option>
                <option value="1">已到場</option>
                <option value="2">逾時未到</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookData: [
        {
          bookId: 1,
          memId: "22",
          memName: "雅婷揍迪客",
          bookDate: '2024-01-22',
          booktime: '下午12:00-15:00',
          numOfPeople: 4,
          tableType: '4人桌',
          bookStatus: 2,
        },
        {
          bookId: 2,
          memId: "25",
          memName: "劉比絲吉",
          bookDate: '2024-02-12',
          booktime: '上午09:00-12:00',
          numOfPeople: 8,
          tableType: '8人桌',
          bookStatus: 0,
        },
      ],
    };
  },
  components: {},
  mounted() {},
};
</script>
<style lang="scss">
//
</style>