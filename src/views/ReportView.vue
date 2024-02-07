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
            <td class="report_article">{{ item.msg_content }}</td>
            <!-- <td class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheck{{ index }}" v-model="item.report_state">
              <label class="form-check-label" for="flexSwitchCheck{{ index }}">
                <span class="switch-label">{{ item.report_state }}</span>
              </label>
            </td> -->
            <td>
              <div class="form-check form-switch">
                <input @click="updateReport(item.report_id)" class="form-check-input " role="switch" type="checkbox"
                  :name="item.report_id" :id="item.report_id" :checked="item.report_state == 1" />
                <label class="form-check-label" :for="item.report_id"></label>
              </div>
              <div class="prodState">
                <span v-if="item.report_state == 1">已下架</span>
                <span v-else>上架中</span>
              </div>
            </td>
            <td>
              <!-- click事件要改，參數一樣 -->
              <input type="checkbox" @click="updateReport(item.report_id)" v-model="item.report_check">{{
                item.report_check }}
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
      chdata: [],
      index: 0,
      reportData: {},
    };
  },
  methods: {
    props: {
      item: Object
    },
    //query抓資料庫內容
    fetchReport() {
      axios
        .post(`${import.meta.env.VITE_API_URL}/report.php`, {})
        .then(res => {
          console.log(res.data.Report); //這可以在f12看到自己的陣列，好用！
          this.reData = res.data.Report;
        })
        .catch(error => console.error('發生錯誤:', error))
    },
    // checkbox參考這邊
    //更新後update資料庫
    updateReport(report_id) {
      console.log(report_id);
      this.chdata = this.reData.filter((item) => {
        return item.report_id == report_id
      })
      if (this.chdata[0]["report_state"] == 0) {
        this.index = 1
      } else {
        this.index = 0
      }

      console.log(this.index);
      // 路徑再改
      let url = `${import.meta.env.VITE_API_URL}/update_report.php`;
      this.reportData = {
        report_id,
        report_state: this.index,
      }
      console.log(this.reportData);
      fetch(url, {
        method: 'post',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(this.reportData)
      }).then(res => res.json())
        .then(result => {
          //如果成功
          if (!result.error) {
            //重新執行query php檔(重新渲染更新後的資料出來)
            this.fetchReport()
            console.log(this.reData);
          }
        })

        .catch(error => console.log(error))


      // axios
      //   .post(`${import.meta.env.VITE_API_URL}/update_report.php`, { report_id: report_id, report_state: this.index, report_check: 0 })
      //   .then(res => {
      //     //console.log(1); //這可以在f12看到自己的陣列，好用！
      //     // this.reData = res.data.updateReport;
      //   })
      //   .catch(error => console.error('發生錯誤:', error))
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
};
</script>


<style lang="scss">
//
</style>
