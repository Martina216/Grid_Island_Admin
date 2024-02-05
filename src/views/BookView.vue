<template>
  <div class="book">

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
    <h3>
    </h3>
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
          memName: "陳雅婷",
          bookDate: '2024-01-22',
          booktime: '下午12:00-15:00',
          numOfPeople: 4,
          tableType: '4人桌',
          bookStatus: 2,
        },
        {
          bookId: 2,
          memId: "25",
          memName: "張教官",
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