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
            <th scope="col" @click="sortId" class="pointer">
              員工編號<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col">員工姓名</th>
            <th scope="col">電子信箱</th>
            <th scope="col">權限等級</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in empData"
            class="border-bottom text-center"
            :key="index"
          >
            <th class="pb-3 pt-3">{{ item.emp_id }}</th>
            <td>{{ item.emp_name }}</td>
            <td>{{ item.emp_acct }}</td>
            <td>
              <select
                class="form-select form-select-sm"
                aria-label="Small select example"
                name="item.emp_id"
                id="item.emp_id"
                v-model="item.emp_permission"
                :disabled="item.emp_state == 0"
                @change="updateEmpPermission(item)"
              >
                <option value="S">超級管理員</option>
                <option value="A">所有權限</option>
                <option value="B">部分權限</option>
              </select>
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
      empData: [],
      sortIdMethod: "asc",
    };
  },
  components: {},
  mounted() {},
  methods: {
    fetchEmp() {
      axios
        .post(`${import.meta.env.VITE_API_URL}/getEmp.php`, {})
        .then((res) => {
          console.log(res.data.emp); //這可以在f12看到自己的陣列，好用！
          this.empData = res.data.emp;
        })
        .catch((error) => console.error("發生錯誤:", error));
    },
    updateEmpState(item) {
      const isChecked = item.emp_state == 0 ? 1 : 0;
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/updateEmpState.php`,
          {
            empId: item.emp_id,
            isChecked,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          item.emp_state = isChecked;
        });
    },
    updateEmpPermission(item) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/updateEmpPermission.php`,
          {
            empId: item.emp_id,
            empPermission: item.emp_permission,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {});
    },
    sortId() {
      if (this.sortIdMethod == "asc") {
        this.empData = this.empData.sort((a, b) => {
          return b.emp_id - a.emp_id;
        });
        this.sortIdMethod = "desc";
      } else if (this.sortIdMethod == "desc") {
        this.empData = this.empData.sort((a, b) => {
          return a.emp_id - b.emp_id;
        });
        this.sortIdMethod = "asc";
      }
    },
  },
  created() {
    this.fetchEmp();
  },
};
</script>
