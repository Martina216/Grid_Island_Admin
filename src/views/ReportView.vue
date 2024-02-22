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
        <select id="searchFilter" v-model="searchFilter" class="rounded border border-1 border-dark">
          <!-- <option value="reportId">檢舉編號</option> -->
          <option value="msgId">文章編號</option>
          <option value="reReason">檢舉原因</option>
        </select>
        <input type="text" id="searchBar" v-model="searchBar" placeholder="請輸入查詢資料"
          class="rounded border border-1 border-dark" @input="handleSearch" />
      </div>
    </div>
    <div class="reTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-center">
            <!-- <th scope="col" @click="sortId" class="pointer">
              檢舉編號<i class="fa-solid fa-sort ms-1"></i>
            </th> -->
            <th scope="col" @click="sortIdMsg" class="pointer">
              文章編號<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col">檢舉原因</th>
            <th scope="col">文章內容</th>
            <th scope="col">狀態</th>
            <th scope="col">已審核</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in reData" class="border-bottom text-center">
            <!-- <th class="pb-3 pt-3">{{ item.report_id }}</th> -->
            <th class="pb-3 pt-3">{{ item.msg_id }}</th>
            <!-- <td>{{ item.msg_id }}</td> -->
            <td>{{ item.report_reason }}</td>
            <td class="report_article">{{ item.msg_content }}</td>
            <td>
              <div class="form-check form-switch">
                <input @click="updateReport(item.report_id)" class="form-check-input " role="switch" type="checkbox"
                  :name="item.report_id" :id="item.report_id" :checked="item.report_state == 1" />
                <label class="form-check-label" :for="item.report_id"></label>
              </div>
              <div class="reportState">
                <span v-if="item.report_state == 1">已下架</span>
                <span v-else>上架中</span>
              </div>
            </td>
            <td>
              <input type="checkbox" @click="checkReport(item.report_id)" :name="item.report_id" :id="item.report_id"
                :checked="item.report_check == 1">
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
      resData: [],
      index: 0,
      reportData: {},
      checkData: [],
      // sortIdMethod: "asc",
      sortIdMsgMethod: "asc",
      searchFilter: "msgId",
      searchBar: "",
    };
  },
  props: {
    item: Object
  },
  methods: {
    //query抓資料庫內容
    fetchReport() {
      axios
        .post(`${import.meta.env.VITE_API_URL}/report.php`, {})
        .then(res => {
          // console.log(res.data);
          this.reData = res.data.Report;
          this.resData = res.data.Report;
        })
        .catch(error => console.error('發生錯誤:', error))
    },

    //同步更新switch後update資料庫
    updateReport(report_id) {
      // 1. 找到與被點擊的報告相關聯的 msg_id
      const clickedReport = this.reData.find(report => report.report_id == report_id);
      const msg_id = clickedReport.msg_id;
      // 2. 遍歷 this.reData 陣列，找到所有 msg_id 等於被點擊報告的 msg_id 的報告
      const reportsToUpdate = this.reData.filter(report => report.msg_id == msg_id);
      // 3. 將所有找到的報告的 report_state 更新為點擊報告的狀態
      const newReportState = clickedReport.report_state == 0 ? 1 : 0;
      reportsToUpdate.forEach(report => report.report_state = newReportState);
      // 4. 向後端發送更新請求
      let url = `${import.meta.env.VITE_API_URL}/update_report.php`;
      //準備要發送到後端的資料，包括msg_id跟更新後的report_state
      let temp = {
        //找到陣列中的第一個msg_id
        msg_id: reportsToUpdate[0].msg_id,
        report_state: newReportState,
      };
      fetch(url, {
        method: 'post',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(temp) // 將準備好的資料轉換成 JSON 字串
      }).then(res => res.json()) // 解析後端回傳的 JSON 格式的回應
        .then(result => {
          // 如果成功
          if (!result.error) {
            // 重新從後端獲取最新的資料
            this.fetchReport();
            console.log(result);
          }
        })
        .catch(error => console.log(error));
    },

    //更新checkbox後update資料庫
    checkReport(report_id) {
      console.log(report_id);
      this.checkData = this.reData.filter((item) => {
        return item.report_id == report_id;
      });
      if (this.checkData[0]["report_check"] == 0) {
        this.index = 1;
      } else {
        this.index = 0;
      }
      console.log(this.index);
      let url = `${import.meta.env.VITE_API_URL}/check_report.php`;
      this.checkData = {
        report_id,
        report_check: this.index,
      }
      fetch(url, {
        method: 'post',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(this.checkData)
      })
        .then((res) => res.json())
        .then(result => {
          //如果成功
          if (!result.error) {
            //重新執行query php檔(重新渲染更新後的資料出來)
            this.fetchReport()
            console.log(this.reData);
          }
        })
        .catch(error => console.log(error))
    },
    //檢舉排序
    // sortId() {
    //   if (this.sortIdMethod == "asc") {
    //     this.reData = this.reData.sort((a, b) => {
    //       return b.report_id - a.report_id;
    //     });
    //     this.sortIdMethod = "desc";
    //   } else if (this.sortIdMethod == "desc") {
    //     this.reData = this.reData.sort((a, b) => {
    //       return a.report_id - b.report_id;
    //     });
    //     this.sortIdMethod = "asc";
    //   }
    // },
    //文章排序
    sortIdMsg() {
      if (this.sortIdMsgMethod == "asc") {
        this.reData = this.reData.sort((a, b) => {
          return b.msg_id - a.msg_id;
        });
        this.sortIdMsgMethod = "desc";
      } else if (this.sortIdMsgMethod == "desc") {
        this.reData = this.reData.sort((a, b) => {
          return a.msg_id - b.msg_id;
        });
        this.sortIdMsgMethod = "asc";
      }
    },
    //搜尋
    handleSearch() {
      if (this.searchFilter === "msgId") {
        if (this.searchBar) {
          console.log(this.chdata);
          this.reData = this.resData.filter((item) => {
            return item.msg_id == this.searchBar;
          });
        } else {
          this.reData = this.resData;
        }
      } else if (this.searchFilter === "reReason") {
        this.reData = this.resData.filter((item) => {
          return item.report_reason.includes(this.searchBar);
        });
      }
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
