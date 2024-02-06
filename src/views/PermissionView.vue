<template>
  <main class="permission">
      <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
              <li class="breadcrumb-item" aria-current="page">
                  <router-link to="/home">首頁</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">權限管理</li>
          </ol>
      </nav>
      <div class="titleGroup">
          <h1>權限管理</h1>
      </div>
      <div class="memTable">
          <table class="table table-hover">
              <thead>
                  <tr class="border-bottom text-center">
                      <th scope="col">員工編號</th>
                      <th scope="col">員工姓名</th>
                      <th scope="col">電子信箱</th>
                      <th scope="col">權限等級</th>
                      <th scope="col">修改</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in empData" class="border-bottom text-center" 
                      :key="index">
                      <th class="pb-3 pt-3">{{ item.emp_id }}</th>
                      <td>{{ item.emp_name }}</td>
                      <td>{{ item.emp_acct }}</td>
                      <td>{{ item.emp_premission }}</td>
                      <td>
                        <button type="button" class="btn btn-info">
                          <i class="fa-solid fa-pen-to-square"></i>編輯
                        </button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </main>
</template>
<script>
  import axios from 'axios';
  export default {
      data() {
          return {
              empData: [
              ],
          };
      },
      components: {},
      mounted() { },
      methods: {
        fetchEmp() {
          axios
              .post(`${import.meta.env.VITE_API_URL}/getEmp.php`, {})
              .then(res => {
                  console.log(res.data.emp); //這可以在f12看到自己的陣列，好用！
                  this.empData = res.data.emp;
              })
              .catch(error => console.error('發生錯誤:', error))
        },
      },
      created() {
          this.fetchEmp();
      },
  };
</script>