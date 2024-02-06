<template>
  <div class="tables">
    <div class="tableContent">
      <h3>桌次管理</h3>

      <form class="tableInfo" v-for="(item, index) in table_typeData">
        <div class="tableInfoTitle">
          <span>桌型</span>
          <span>桌次數量</span>
        </div>
        <div class="fourTable">
          <span>4人桌</span>
          <input type="number" />
        </div>
        <div class="eightTable">
          <span>8人桌</span>
          <input type="number" />
        </div>
        <div class="twelveTable">
          <span>12人桌</span>
          <input type="number" />
        </div>
        <input type="submit" value="儲存設定" class="btn btn-info" />
      </form>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        table_typeData:[],
      };
    },
    methods: {
      fetchNews() {
        axios
          .post(`${import.meta.env.VITE_API_URL}/admin/table_type.php`, {})
          .then(res => {
            console.log(res.data.table_type); //這可以在f12看到自己的陣列，好用！
            this.table_typeData = res.data.table_type;
          })
          .catch(error => console.error('發生錯誤:',error))
      },
      
    },
    created() {
      this.fetchNews();
    }
  }

</script>

<style lang="scss">
//
</style>
