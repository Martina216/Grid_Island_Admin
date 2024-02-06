<template>
  <main class="report">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">檢舉管理</li>
      </ol>
    </nav>
    <div class="titleGroup">
      <h1>檢舉管理</h1>
      <div class="searchGroup">
        <select id="searchFilter" class="rounded border border-1 border-dark">
          <option value="msgId">留言編號</option>
          <option value="reReason">檢舉原因</option>
          <option value="msg_content">檢舉狀態</option>
          <option value="reTime">未審核</option>
          <option value="reTime">已審核</option>
        </select>
        <input type="text" id="searchBar" placeholder="請輸入查詢資料" class="rounded border border-1 border-dark" />
      </div>
    </div>
    <div class="reTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-center">
            <th scope="col">檢舉編號</th>
            <th scope="col">檢舉原因</th>
            <th scope="col">文章內容</th>
            <th scope="col">狀態</th>
            <th scope="col">已審核</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in reData" class="border-bottom text-center">
            <th class="pb-3 pt-3">{{ item.report_id }}</th>
            <td>{{ item.report_reason }}</td>
            <td>{{ item.msg_content }}</td>
            <td class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheck{{ index }}" v-model="item.report_state">
              <label class="form-check-label" for="flexSwitchCheck{{ index }}">
                <!-- <span class="switch-label">{{ item.isOn ? '上架中' : '已下架' }}</span> -->
                <span class="switch-label">{{ item.report_state }}</span>
                <!-- <span class="switch-label">{{ reportStateText }}</span> -->
              </label>
            </td>
            <td>
              <!-- <input type="checkbox" v-model="item.report_check" @change="report_cb_state"> -->
              <input type="checkbox" v-model="item.report_check">{{ item.report_check }}
            </td>
            <!-- <td>switch</td> -->
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
      reData: [
        // {
        //   reId: 1,
        //   reReason: '廣告',
        //   msg: "趕快來買生髮水吧！",
        //   isOn: false,
        //   reCheck: false, 
        // },
        // {
        //   reId: 2,
        //   reReason: '帶有攻擊性言論',
        //   msg: "乾書長的好像狐狸",
        //   isOn: true,
        //   reCheck: true,
        // },
        // {
        //   reId: 3,
        //   reReason: '我就是不喜歡',
        //   msg: "大傑好帥><",
        //   isOn: false,
        //   reCheck: false, 
        // },
        // {
        //   reId: 4,
        //   reReason: '不實資訊',
        //   msg: "第二大道有人在發小天使的氣息",
        //   // isOn: false,
        //   // reCheck: false, 
        // },
      ],
    };
  },
  methods: {
    props: {
      item: Object
    },
    report_cb_state() {
      if (this.item.report_check === 0) {
        this.item.report_check = false;
      } else {
        this.item.report_check = true;
      }
    },
    // aaa(){
    //   const cb_change = 1;
    // },
    fetchReport() {
      axios
        .post(`${import.meta.env.VITE_API_URL}/report.php`, {})
        .then(res => {
          console.log(res.data.Report); //這可以在f12看到自己的陣列，好用！
          this.reData = res.data.Report;
        })
        .catch(error => console.error('發生錯誤:', error))
    },
  },
  created() {
    this.fetchReport();
  },
  computed: {
    reportStateText() {
      return this.item.report_state === 0 ? '上架中' : '已下架';
    }
  },
  mounted() {

  },
};
</script>


<style lang="scss">
//
</style>
