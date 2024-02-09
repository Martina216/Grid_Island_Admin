<template>
  <div class="tables">
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">
                    <router-link to="/home">首頁</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">桌次管理</li>
            </ol>
        </nav>
        <div class="titleGroup">
            <h1>桌次管理</h1>
        </div>

    <div class="tableContent">
      <form class="tableInfo">
        <div class="tableInfoTitle">
          <span>桌型</span>
          <span>桌次數量</span>
        </div>
        <div v-for="(item, index) in table_typeData" class="tabletype">
          <span>{{ item.table_type_name }}</span>
          <input type="number" v-model="item.table_amount" :key="index"/>
        </div>
        <input type="button" @click="changeTables()" value="儲存設定" class="btn btn-info"  />
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default{
    data() {
      return {
        table_typeData:[],
      };
    },
    methods: {
      fetchTabletypes() { //從資料庫中抓到資料
        axios
          .post(`${import.meta.env.VITE_API_URL}/getTable_type.php`, {})
          .then(res => {
            console.log(res.data.table_type); //這可以在f12看到自己的陣列，好用！
            this.table_typeData = res.data.table_type;
          })
          .catch(error => console.error('發生錯誤:',error))
      },
      changeTables(item){
        axios
        .post(
          `${import.meta.env.VITE_API_URL}/updateTable_temp.php`,
          this.table_typeData
          // {
          //   table_amount: item.table_amount,
          //   table_type_id: item.table_type_id
          // },
        )
        .then((res) => {
          console.log(res.data);
          alert("已修改完成");
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
    created() {
      this.fetchTabletypes();
    }
  }

</script>

<style lang="scss">
//
</style>
