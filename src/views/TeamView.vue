<template>
  <main class="team">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">報隊管理</li>
      </ol>
    </nav>
    <div class="titleGroup">
      <h1>報隊管理</h1>
      <div class="searchGroup">
        <select id="searchFilter" class="rounded border border-1 border-dark">
          <option value="teamId">報隊編號</option>
          <option value="teamTime">遊玩日期</option>
        </select>
        <input type="text" id="searchBar" placeholder="請輸入查詢資料" class="rounded border border-1 border-dark" />
      </div>
    </div>
    <div class="reTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-center">
            <th scope="col">報隊編號</th>
            <th scope="col">主揪會員</th>
            <th scope="col">遊玩日期</th>
            <th scope="col">遊玩時間</th>
            <th scope="col">文章內容</th>
            <th scope="col">下架文章</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in card" class="border-bottom text-center">
            <th class="pb-3 pt-3">{{ item.id }}</th>
            <td>{{ item.memName }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.article }}</td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled>
                <label class="form-check-label" for="flexSwitchCheckDisabled"></label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


  </main>
</template>


<script>
// import axios from "axios";
export default {
  data() {
    return { 
      card:[
        {
          id: 1,
          memName:'窩金',
          memId: '202312300001',
          date: '2023/3/9',
          time:'20:30',
          article:'徵求一起玩阿瓦蟲的夥伴，目前有我跟我朋友兩個男生，希望再找兩個重度玩家。',
        },
      ],
    };
  },
};
</script>



<style lang="scss">
//
</style>
