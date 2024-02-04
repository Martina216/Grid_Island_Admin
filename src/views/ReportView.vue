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
          <option value="msg">檢舉狀態</option>
          <option value="reTime">未審核</option>
          <option value="reTime">已審核</option>
        </select>
        <input
          type="text"
          id="searchBar"
          placeholder="請輸入查詢資料"
          class="rounded border border-1 border-dark"
        />
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
            <th class="pb-3 pt-3">{{ item.reId }}</th>
            <td>{{ item.reReason }}</td>
            <td>{{ item.msg }}</td>
            <td class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheck{{ index }}" v-model="item.isOn">
              <label class="form-check-label" for="flexSwitchCheck{{ index }}">
                <span class="switch-label">{{ item.isOn ? '上架中' : '已下架' }}</span>
              </label>
            </td>
            <td>
              <input type="checkbox" v-model="item.reCheck">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

      
  </main>
</template>

<script>
export default {
  data() {
    return {
      reData: [
        {
          reId: 1,
          reReason: '廣告',
          msg: "趕快來買生髮水吧！",
          isOn: false, // 添加 isOn 來表示狀態
          reCheck: false, // 也可以添加其他屬性，表示其他狀態
        },
        {
          reId: 2,
          reReason: '帶有攻擊性言論',
          msg: "乾書長的好像狐狸",
          isOn: true,
          reCheck: true,
        },
        {
          reId: 3,
          reReason: '我就是不喜歡',
          msg: "大傑好帥><",
          isOn: false,
          reCheck: false,
        },
        {
          reId: 4,
          reReason: '不實資訊',
          msg: "第二大道有人在發小天使的氣息",
          isOn: false,
          reCheck: false,
        },
      ],
    };
  },
  components: {},
  mounted() {
    // this.initBootstrapSwitch();
  },
  methods: {
    // initBootstrapSwitch() {
    //     for (let i = 0; i < this.reData.length; i++) {
    //         $(`#flexSwitchCheck${i}`).bootstrapSwitch({  
    //             onText: "已上架",  
    //             offText: "已下架", 
    //         });
    //     }
    // },
  },
};
</script>


<style lang="scss">
//

</style>
