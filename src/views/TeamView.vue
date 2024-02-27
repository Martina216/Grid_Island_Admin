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
        <select id="searchFilter" v-model="searchFilter" class="rounded border border-1 border-dark">
          <option value="teamId">報隊編號</option>
          <!-- <option value="teamTime">遊玩日期</option> -->
        </select>
        <input type="text" v-model="searchBar" id="searchBar" placeholder="請輸入查詢資料"
          class="rounded border border-1 border-dark" @input="handleSearch" />
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
            <td class="team_article">{{ item.article }}</td>
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
      card: [
        {
          id: 1,
          memName: '窩金',
          memId: '202312300001',
          date: '2023/3/9',
          time: '20:30',
          article: '徵求一起玩阿瓦蟲的夥伴，目前有我跟我朋友兩個男生，希望再找兩個重度玩家。',
        },
        {
          id: 2,
          memName: '甘舒',
          memId: '202312300002',
          date: '2023/3/11',
          time: '10:00',
          article: '徵求一起玩貓嶼成之內的玩家，目前有我跟我朋友兩個男生，希望再找兩個重度玩家。',
        },
        {
          id: 3,
          memName: '金',
          memId: '202312300003',
          date: '2023/3/12',
          time: '09:00',
          article: '三缺一',
        },
        {
          id: 4,
          memName: '大傑',
          memId: '202312300004',
          date: '2023/3/12',
          time: '09:30',
          article: '徵求一起玩桌遊的人，目前有我跟我朋友兩個人，希望再找多找幾個人。',
        },
        {
          id: 5,
          memName: '酷逼',
          memId: '202312300005',
          date: '2023/3/15',
          time: '12:30',
          article: '歡迎新手玩家！不論你是初次嘗試還是已經是輕度玩家，我們期待與你一同探索阿瓦蟲的奇妙世界。最適合3到5人，讓我們一同組隊，共同面對這場策略與冒險的旅程！',
        },
        {
          id: 6,
          memName: '奇牙',
          memId: '202312300005',
          date: '2023/3/17',
          time: '18:30',
          article: '揪團啟動！無論你是新手或者是屋蟲的忠實愛好者，這是個適合所有玩家的桌遊。想要挑戰建造最獨特的房屋嗎？快來加入我們，1到6人都能盡情參與！',
        },
        {
          id: 7,
          memName: '灰傑克',
          memId: '202312300007',
          date: '2023/3/21',
          time: '20:00',
          article: '揪團！重度玩家快來，新手也別怕，我們會用最簡單的方式介紹貓與城之內。這個遊戲適合2到4人，快來參與這場貓咪與城堡的冒險吧！',
        },
        {
          id: 8,
          memName: '皮諾渴',
          memId: '202312300008',
          date: '2023/3/24',
          time: '09:30',
          article: '想要一場宇宙級的戰鬥嗎？星際大戰局等著你！無論你是新手還是老玩家，快來加入這場2到6人的星際冒險！',
        },
        {
          id: 9,
          memName: '明人',
          memId: '202312300009',
          date: '2023/3/24',
          time: '10:00',
          article: '這是一場文學與戲劇的交融，無論你對莎士比亞是否熟悉，我們都歡迎你參與這場3到7人的文藝遊戲。新手玩家也能輕鬆上手，一同演繹屬於你的悲喜劇！',
        },
        {
          id: 10,
          memName: '酷喇皮卡',
          memId: '202312300010',
          date: '2023/3/25',
          time: '10:00',
          article: '航向未知的海域，挑戰海盜與寶藏的命運！這款遊戲適合2到5人，無論你是初次冒險還是經驗豐富，都歡迎一同參與這場海上歷險！',
        },
        {
          id: 11,
          memName: '大傑',
          memId: '202312300011',
          date: '2023/3/26',
          time: '12:30',
          article: '換乘你的骰子，展開大富翁列車之旅！這是一場適合2到4人的資源管理遊戲，新手們不用擔心，我們會有老手陪伴你一同體驗經濟策略的樂趣。',
        },
        {
          id: 12,
          memName: '啊人家家就笨壓',
          memId: '202312300012',
          date: '2023/3/28',
          time: '16:00',
          article: '進入禁忌之夜，化身為偵探！這款推理遊戲適合4到6人，無論你是新手還是已經深獲其樂，快來參與這場神秘的探案之旅。',
        },
        {
          id: 13,
          memName: '那美',
          memId: '202312300013',
          date: '2023/3/29',
          time: '18:30',
          article: '融入海洋深處，建設你的海底城市！這款建設遊戲適合2到5人，讓我們一同探索海底奇觀，新手們也能輕鬆上手！',
        },
        {
          id: 14,
          memName: '海綿小寶',
          memId: '202312300014',
          date: '2023/3/29',
          time: '18:00',
          article: '踏入仙境，一同體驗奇蹟的魔法！這是一場2到7人的奇幻遊戲，無論你是新手還是老玩家，都歡迎加入這場令人陶醉的冒險之旅！',
        },
      ],
      chdata: [
      {
          id: 1,
          memName: '窩金',
          memId: '202312300001',
          date: '2023/3/9',
          time: '20:30',
          article: '徵求一起玩阿瓦蟲的夥伴，目前有我跟我朋友兩個男生，希望再找兩個重度玩家。',
        },
        {
          id: 2,
          memName: '甘舒',
          memId: '202312300002',
          date: '2023/3/11',
          time: '10:00',
          article: '徵求一起玩貓嶼成之內的玩家，目前有我跟我朋友兩個男生，希望再找兩個重度玩家。',
        },
        {
          id: 3,
          memName: '金',
          memId: '202312300003',
          date: '2023/3/12',
          time: '09:00',
          article: '三缺一',
        },
        {
          id: 4,
          memName: '大傑',
          memId: '202312300004',
          date: '2023/3/12',
          time: '09:30',
          article: '徵求一起玩桌遊的人，目前有我跟我朋友兩個人，希望再找多找幾個人。',
        },
        {
          id: 5,
          memName: '酷逼',
          memId: '202312300005',
          date: '2023/3/15',
          time: '12:30',
          article: '歡迎新手玩家！不論你是初次嘗試還是已經是輕度玩家，我們期待與你一同探索阿瓦蟲的奇妙世界。最適合3到5人，讓我們一同組隊，共同面對這場策略與冒險的旅程！',
        },
        {
          id: 6,
          memName: '奇牙',
          memId: '202312300005',
          date: '2023/3/17',
          time: '18:30',
          article: '揪團啟動！無論你是新手或者是屋蟲的忠實愛好者，這是個適合所有玩家的桌遊。想要挑戰建造最獨特的房屋嗎？快來加入我們，1到6人都能盡情參與！',
        },
        {
          id: 7,
          memName: '灰傑克',
          memId: '202312300007',
          date: '2023/3/21',
          time: '20:00',
          article: '揪團！重度玩家快來，新手也別怕，我們會用最簡單的方式介紹貓與城之內。這個遊戲適合2到4人，快來參與這場貓咪與城堡的冒險吧！',
        },
        {
          id: 8,
          memName: '皮諾渴',
          memId: '202312300008',
          date: '2023/3/24',
          time: '09:30',
          article: '想要一場宇宙級的戰鬥嗎？星際大戰局等著你！無論你是新手還是老玩家，快來加入這場2到6人的星際冒險！',
        },
        {
          id: 9,
          memName: '明人',
          memId: '202312300009',
          date: '2023/3/24',
          time: '10:00',
          article: '這是一場文學與戲劇的交融，無論你對莎士比亞是否熟悉，我們都歡迎你參與這場3到7人的文藝遊戲。新手玩家也能輕鬆上手，一同演繹屬於你的悲喜劇！',
        },
        {
          id: 10,
          memName: '酷喇皮卡',
          memId: '202312300010',
          date: '2023/3/25',
          time: '10:00',
          article: '航向未知的海域，挑戰海盜與寶藏的命運！這款遊戲適合2到5人，無論你是初次冒險還是經驗豐富，都歡迎一同參與這場海上歷險！',
        },
        {
          id: 11,
          memName: '大傑',
          memId: '202312300011',
          date: '2023/3/26',
          time: '12:30',
          article: '換乘你的骰子，展開大富翁列車之旅！這是一場適合2到4人的資源管理遊戲，新手們不用擔心，我們會有老手陪伴你一同體驗經濟策略的樂趣。',
        },
        {
          id: 12,
          memName: '啊人家家就笨壓',
          memId: '202312300012',
          date: '2023/3/28',
          time: '16:00',
          article: '進入禁忌之夜，化身為偵探！這款推理遊戲適合4到6人，無論你是新手還是已經深獲其樂，快來參與這場神秘的探案之旅。',
        },
        {
          id: 13,
          memName: '那美',
          memId: '202312300013',
          date: '2023/3/29',
          time: '18:30',
          article: '融入海洋深處，建設你的海底城市！這款建設遊戲適合2到5人，讓我們一同探索海底奇觀，新手們也能輕鬆上手！',
        },
        {
          id: 14,
          memName: '海綿小寶',
          memId: '202312300014',
          date: '2023/3/29',
          time: '18:00',
          article: '踏入仙境，一同體驗奇蹟的魔法！這是一場2到7人的奇幻遊戲，無論你是新手還是老玩家，都歡迎加入這場令人陶醉的冒險之旅！',
        },
      ],
      searchFilter: "teamId",
      searchBar: "",
    };
  },
  methods: {
    //搜尋
    handleSearch() {

      if (this.searchFilter === "teamId") {
        if (this.searchBar) {
          this.card = this.chdata.filter((item) => {
            return item.id == this.searchBar;
          });
        } else {
          this.card = this.chdata;
        }
      }
    },
  },
};
</script>



<style lang="scss">
//
</style>
