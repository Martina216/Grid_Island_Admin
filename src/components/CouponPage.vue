<template>
  <main class="couponPage">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <router-link to="/code">優惠碼管理</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">新增優惠碼</li>
      </ol>
    </nav>
    <div class="mainTitle pb-5">
      <h1>新增優惠碼</h1>
      <form
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="submitForm"
      >
        <div class="wrapper">
          <div class="text">
            <div class="code">
              <label for="couponCode"><span>優惠碼序號</span></label>
              <input
                v-model="formData.coupon_code"
                type="text"
                name="coupon_code"
                id="couponCode"
                class="form-check-input rounded border border-1 border-gray"
                placeholder="請輸入優惠碼序號"
              />
            </div>
            <div class="content">
              <label for="couponContent"><span>優惠碼說明</span></label>
              <textarea
                v-model="formData.coupon_detail"
                name="coupon_content"
                id="couponContent"
                class="rounded border border-1 border-gray"
                placeholder="請輸入優惠碼說明"
              ></textarea>
            </div>
            <div class="amount">
              <label for="amount"><span>折扣金額</span></label>
              <input
                type="number"
                name="amount"
                class="rounded border border-1 border-gray"
                id="amount"
                v-model="formData.coupon_amount"
                placeholder="請輸入優惠碼折扣金額"
              />
            </div>
            <div class="startDate">
              <label for="startDate"><span>優惠碼使用開始日期</span></label>
              <input
                v-model="formData.coupon_start_date"
                type="date"
                name="start_date"
                id="startDate"
                class="form-check-input rounded border border-1 border-gray"
              />
            </div>
            <div class="endDate">
              <label for="endDate"><span>優惠碼使用結束日期</span></label>
              <input
                v-model="formData.coupon_end_date"
                type="date"
                name="end_date"
                id="endDate"
                class="form-check-input rounded border border-1 border-gray"
              />
            </div>
            <div class="marquee">
              <input
                type="checkbox"
                name="marquee"
                id="marquee"
                v-model="formData.coupon_marquee"
              />
              <label for="marquee"><span>是否顯示於跑馬燈</span></label>
            </div>
            <div class="startPubDate" v-if="formData.coupon_marquee">
              <label for="startPubDate"><span>優惠碼開放開始日期</span></label>
              <input
                v-model="formData.coupon_pub_start_date"
                type="date"
                name="start_pub_date"
                id="startPubDate"
                class="form-check-input rounded border border-1 border-gray"
              />
            </div>
            <div class="endPubDate" v-if="formData.coupon_marquee">
              <label for="endPubDate"><span>優惠碼開放結束日期</span></label>
              <input
                v-model="formData.coupon_pub_end_date"
                type="date"
                name="end_pub_date"
                id="endPubDate"
                class="form-check-input rounded border border-1 border-gray"
              />
            </div>
          </div>
        </div>
        <div class="btnArea">
          <div class="addBtn">
            <button type="button" @click="submitForm" class="btn btn-info">
              <i class="fa-solid fa-plus"></i>新增優惠碼
            </button>
          </div>
          <div @click="cancelAdd" class="cancelBtn">
            <button type="button" class="btn btn-outline-secondary">
              取消
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        coupon_code: "",
        coupon_detail: "",
        coupon_amount: "",
        coupon_start_date: "",
        coupon_end_date: "",
        coupon_marquee: false,
        coupon_pub_start_date: "",
        coupon_pub_end_date: "",
      },
      file: null,
    };
  },
  methods: {
    cancelAdd() {
      this.clearForm();
      this.$emit("closeTab");
    },
    clearForm() {
      this.formData = {
        coupon_code: "",
        coupon_detail: "",
        coupon_amount: "",
        coupon_start_date: "",
        coupon_end_date: "",
        coupon_marquee: false,
        coupon_pub_start_date: "",
        coupon_pub_end_date: "",
      };
    },
    submitForm() {
      const formData = new FormData();
      formData.append("promo_code", this.formData.coupon_code);
      formData.append("promo_detail", this.formData.coupon_detail);
      formData.append("promo_amount", this.formData.coupon_amount);
      formData.append(
        "promo_start_date",
        new Date(this.formData.coupon_start_date).toISOString()
      ); //將日期轉換為ISO格式
      formData.append(
        "promo_end_date",
        new Date(this.formData.coupon_end_date).toISOString()
      );
      formData.append("marquee_state", this.formData.coupon_marquee ? 1 : 0);
      formData.append(
        "promo_pub_start_date",
        this.formData.coupon_pub_start_date != "1970-01-01" &&
          this.formData.coupon_pub_start_date &&
          this.formData.coupon_pub_start_date != "0000-00-00"
          ? new Date(this.formData.coupon_pub_start_date).toISOString()
          : null
      );
      formData.append(
        "promo_pub_end_date",
        this.formData.coupon_pub_end_date != "1970-01-01" &&
          this.formData.coupon_pub_end_date &&
          this.formData.coupon_pub_end_date != "0000-00-00"
          ? new Date(this.formData.coupon_pub_end_date).toISOString()
          : null
      );

      axios
        .post(`${import.meta.env.VITE_API_URL}/insertPromo.php`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          alert(res.data.msg);
        })
        .then((result) => {
          this.$emit("closeTab");
          this.reloadPage();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    reloadPage() {
      location.reload();
    },
  },
  created() {},
};
</script>
