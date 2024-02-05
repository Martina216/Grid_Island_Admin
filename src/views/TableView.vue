<template>
  <div class="tables">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">預約管理</li>
        <li class="breadcrumb-item active" aria-current="page">桌次管理</li>
      </ol>
    </nav>
    <div class="tableContent">
      <h1>桌次管理</h1>

      <form class="tableInfo">
        <div class="tableInfoTitle">
          <span>桌型</span>
          <span>桌次數量</span>
        </div>
        <div v-for="(table, index) in tableData" class="table">
          <span>{{table.tablesTypeName}}</span>
          <input type="number" v-model="table.tablesAmount">
        </div>
        <input type="submit" value="儲存設定" class="btn btn-info" />
      </form>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      tableData: [{
        tablesTypeId: 1,
        tablesTypeName: "四人桌",
        tablesAmount: 4,
      },{
        tablesTypeId: 2,
        tablesTypeName: "八人桌",
        tablesAmount: 1,
      },{
        tablesTypeId: 3,
        tablesTypeName: "十二人桌",
        tablesAmount: 1,
      }]
    }
  }
}
</script>

<style lang="scss">
//
</style>
