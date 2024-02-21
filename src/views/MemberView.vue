<template>
  <main class="member">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">會員管理</li>
      </ol>
    </nav>
    <div class="titleGroup">
      <h1>會員管理</h1>
      <div class="searchGroup">
        <select id="searchFilter" class="rounded border border-1 border-dark" v-model="searchSelect" @change="handleSearch">
          <option value="memId">會員編號</option>
          <option value="memName">會員姓名</option>
          <option value="memTel">連絡電話</option>
          <option value="memEmail">電子信箱</option>
        </select>
        <input
          type="text"
          id="searchBar"
          placeholder="請輸入查詢資料"
          class="rounded border border-1 border-dark"
          @input="handleSearch"
          v-model="searchBar"
        />
      </div>
    </div>
    <div class="memTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-center">
            <th scope="col">會員編號</th>
            <th scope="col">會員姓名</th>
            <th scope="col">連絡電話</th>
            <th scope="col">電子信箱(帳號)</th>
            <th scope="col">權限管理</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in displaymemdata"
            class="border-bottom text-center"
            :key="index"
          >
            <th class="pb-3 pt-3">{{ item.mem_id }}</th>
            <td>{{ item.mem_name }}</td>
            <td>{{ item.mem_tel }}</td>
            <td>{{ item.mem_email }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  role="switch"
                  type="checkbox"
                  :name="item.mem_id"
                  :id="item.mem_id"
                  :checked="item.mem_state == 1"
                  @change="updateMemState(item)"
                />
                <label class="form-check-label" :for="item.mem_id"></label>
              </div>
              <div class="memState">
                <span v-if="item.mem_state == 1">正常</span>
                <span v-else>已停權</span>
              </div>
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
      memData: [],
      displaymemdata:[], //複製會員資料展示用
      searchBar:"",//輸入框
      searchSelect:"memId", //預設搜尋選擇的是會員編號


    };
  },
  created() {
    this.fetchMember();
  },
  methods: {
    fetchMember() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/member.php`)
        .then((res) => {
          // console.log(res.data.mem); //這可以在f12看到自己的陣列，好用！
          this.memData = res.data.mem;
          this.displaymemdata=res.data.mem
        })
        .catch((error) => console.error("發生錯誤:", error));
    },
    updateMemState(item){//會員停權
      const switch_change = item.mem_state == 0 ? 1 : 0;
      //會員狀態=0時，會回傳TRUE，所以switch_change就是true->所以switch_change=1，反之會員狀態=1的時候救回傳false->switch_change=0
      axios({
        method:'post',
        url: `${import.meta.env.VITE_API_URL}/updateMemberState.php`,
        headers: { "Content-Type": "multipart/form-data" },
        data: {
          mem_id:item.mem_id,
          switch_change
        }
      })
      .then((res)=>{
        item.ord_state = switch_change;
        // this.fetchOrder();
        location.reload();
        alert("此會員已成功停權")
      })
      .catch((error) => {
          console.log(error);
      });


    },
    handleSearch(){//搜尋欄
      if(this.searchSelect=="memId"){
        if (this.searchBar) {
          this.displaymemdata=this.memData.filter(data=>{
            return data.mem_id.toString().includes(this.searchBar.trim())
          })
        }else{
          this.displaymemdata=this.memData
        }
      }else if (this.searchSelect=="memName") {
        if (this.searchBar) {
          this.displaymemdata=this.memData.filter(data=>{
            return data.mem_name.toString().includes(this.searchBar.trim())
          })
        }else{
          this.displaymemdata=this.memData
        }
      }else if (this.searchSelect=="memTel") {
        if (this.searchBar) {
          this.displaymemdata=this.memData.filter(data=>{
            return data.mem_tel.toString().includes(this.searchBar.trim())
          })
        }else{
          this.displaymemdata=this.memData
        }
      }else if (this.searchSelect=="memEmail") {
        if (this.searchBar) {
          this.displaymemdata=this.memData.filter(data=>{
            return data.mem_email.toString().includes(this.searchBar.trim())
          })
        }else{
          this.displaymemdata=this.memData
        }
      }
    },
  },
};
</script>
