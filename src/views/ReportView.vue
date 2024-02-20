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
        <select
        id="searchFilter"
        v-model="searchFilter"
        class="rounded border border-1 border-dark"
        >
          <option value="reportId">檢舉編號</option>
          <option value="msgId">文章編號</option>
          <option value="reReason">檢舉原因</option>
        </select>
        <input 
        type="text" 
        id="searchBar" 
        v-model="searchBar" 
        placeholder="請輸入查詢資料"
        class="rounded border border-1 border-dark" 
        @input="handleSearch" 
        />
      </div>
    </div>
    <div class="reTable">
      <table class="table table-hover">
        <thead>
          <tr class="border-bottom text-center">
            <!-- <th scope="col">檢舉編號</th> -->
            <th scope="col" @click="sortId" class="pointer">
              檢舉編號<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <th scope="col" @click="sortIdMsg" class="pointer">
              文章編號<i class="fa-solid fa-sort ms-1"></i>
            </th>
            <!-- <th scope="col">文章編號</th> -->
            <th scope="col">檢舉原因</th>
            <th scope="col">文章內容</th>
            <th scope="col">狀態</th>
            <th scope="col">已審核</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in reData" class="border-bottom text-center">
            <th class="pb-3 pt-3">{{ item.report_id }}</th>
            <td>{{ item.msg_id }}</td>
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
      index: 0,
      reportData: {},
      checkData: [],
      sortIdMethod: "asc",
      sortIdMsgMethod: "asc",
      searchFilter: "reportId",
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
        })
        .catch(error => console.error('發生錯誤:', error))
    },
    //更新switch後update資料庫
    updateReport(report_id) {
      // console.log(msg_id);
      this.chdata = this.reData.filter((item) => {
        return item.report_id == report_id
      })
      if (this.chdata[0]["report_state"] == 0) {
        this.index = 1
      } else {
        this.index = 0
      }
      let url = `${import.meta.env.VITE_API_URL}/update_report.php`;
      this.reportData = {
        report_id,
        report_state: this.index,
      }
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
    },
    //checkbox
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
    sortId() {
      if (this.sortIdMethod == "asc") {
        this.reData = this.reData.sort((a, b) => {
          return b.report_id - a.report_id;
        });
        this.sortIdMethod = "desc";
      } else if (this.sortIdMethod == "desc") {
        this.reData = this.reData.sort((a, b) => {
          return a.report_id - b.report_id;
        });
        this.sortIdMethod = "asc";
      }
    },
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
    // handleSearch() {
    //   let searchData = [...this.reData]; // 使用複本保存原始資料
    //   let keyword = this.searchBar.trim().toLowerCase(); // 將搜索欄中的關鍵字轉為小寫並去除空白

    //   if (!keyword) {
    //     this.reData = searchData; // 如果搜索欄為空，顯示完整資料
    //     return;
    //   }

    //   this.reData = searchData.filter((item) => {
    //     if (this.searchFilter === "reportId") {
    //       return String(item.report_id).includes(keyword);
    //     } else if (this.searchFilter === "msgId") {
    //       return String(item.msg_id).includes(keyword);
    //     } else if (this.searchFilter === "reReason") {
    //       return item.report_reason.toLowerCase().includes(keyword);
    //     }
    //   });
    // },


    handleSearch() {
      console.log(this.reData);
      if (this.searchFilter === "reportId") {
        if (this.searchBar) {
          this.reData = this.chdata.filter((item) => {
            return item.report_id == this.searchBar;
          });
        } else {
          this.reData = this.chdata;
        }
      }
      else if (this.searchFilter === "msgId") {
        if (this.searchBar) {
          this.reData = this.chdata.filter((item) => {
            return item.msg_id == this.searchBar;
          });
        } else {
          this.reData = this.chdata;
        }
      } else if (this.searchFilter === "reReason") {
        this.reData = this.chdata.filter((item) => {
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
