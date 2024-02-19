<template>
  <main class="home">
    <div class="homeCardList">
      <HomeCard
        v-for="item in homeData"
        :cardName="item.pageName"
        :cardCount="item.pageCount"
        :cardIcon="item.pageIcon"
        :cardLink="item.pageLink"
      />
    </div>
  </main>
</template>
<script>
import axios from "axios";
import HomeCard from "../components/HomeCard.vue";
export default {
  data() {
    return {
      homeData: [
        {
          pageIcon: "fa-solid fa-clipboard-list",
          pageCount: 110,
          pageName: "未出貨訂單",
          pageLink: "/order",
        },
        {
          pageIcon: "fa-solid fa-cart-shopping",
          pageCount: 110,
          pageName: "商品數量",
          pageLink: "/product",
        },
        {
          pageIcon: "fa-regular fa-rectangle-list",
          pageCount: 54,
          pageName: "預約訂單",
          pageLink: "/book",
        },
        {
          pageIcon: "fa-regular fa-newspaper",
          pageCount: 14,
          pageName: "最新消息",
          pageLink: "/news",
        },
        {
          pageIcon: "fa-regular fa-comment-dots",
          pageCount: 7,
          pageName: "留言板檢舉",
          pageLink: "/report",
        },
        {
          pageIcon: "fa-solid fa-users",
          pageCount: 265,
          pageName: "會員",
          pageLink: "/member",
        },
      ],
    };
  },
  components: {
    HomeCard,
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    fetchData() {
      axios
        .post(`${import.meta.env.VITE_API_URL}/getData.php`, {})
        .then((res) => {
          this.homeData.forEach((item) => {
            const key = item.pageLink.substring(1);
            item.pageCount = res.data[key] || 0;
          });
        })
        .catch((error) => console.error("發生錯誤:", error));
    },
  },
};
</script>
