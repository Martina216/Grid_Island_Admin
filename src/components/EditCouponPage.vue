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
                v-model="editData.promo_code"
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
                v-model="editData.promo_detail"
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
                v-model="editData.promo_amount"
                placeholder="請輸入優惠碼折扣金額"
              />
            </div>
            <div class="startDate">
              <label for="startDate"><span>優惠碼使用開始日期</span></label>
              <input
                v-model="editData.promo_start_date"
                type="date"
                name="start_date"
                id="startDate"
                class="form-check-input rounded border border-1 border-gray"
              />
            </div>
            <div class="endDate">
              <label for="endDate"><span>優惠碼使用結束日期</span></label>
              <input
                v-model="editData.promo_end_date"
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
                @change="isChecked"
                :checked="editData.marquee_state == 1"
              />
              <label for="marquee"><span>是否顯示於跑馬燈</span></label>
            </div>
            <div class="startPubDate" v-if="editData.marquee_state">
              <label for="startPubDate"><span>優惠碼使用開始日期</span></label>
              <input
                v-model="editData.promo_pub_start"
                type="date"
                name="start_pub_date"
                id="startPubDate"
                class="form-check-input rounded border border-1 border-gray"
              />
            </div>
            <div class="endPubDate" v-if="editData.marquee_state">
              <label for="endPubDate"><span>優惠碼使用結束日期</span></label>
              <input
                v-model="editData.promo_pub_end"
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
            <button type="button" @click="updatePromo" class="btn btn-info">
              <i class="fa-solid fa-plus"></i>修改優惠碼
            </button>
          </div>
          <div @click="cancelEdit" class="cancelBtn">
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
      editData: { ...this.data },
    };
  },
  props: {
    data: Object,
  },
  methods: {
    cancelEdit() {
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
    updatePromo() {
      console.log(this.editData.marquee_state);
      console.log(this.editData.promo_start_date);
      const formData = new FormData();
      formData.append("promo_id", this.editData.coupon_id);
      formData.append("promo_code", this.editData.coupon_code);
      formData.append("promo_detail", this.editData.coupon_detail);
      formData.append("promo_amount", this.editData.coupon_amount);
      formData.append(
        "promo_start_date",
        new Date(this.editData.promo_start_date).toISOString()
      ); //將日期轉換為ISO格式
      formData.append(
        "promo_end_date",
        new Date(this.editData.promo_end_date).toISOString()
      );
      formData.append("marquee_state", this.editData.coupon_marquee ? 1 : 0);
      formData.append(
        "promo_pub_start_date",
        this.editData.coupon_pub_start_date
          ? new Date(this.editData.coupon_pub_start_date).toISOString()
          : null
      );
      formData.append(
        "promo_pub_end_date",
        this.editData.coupon_pub_end_date
          ? new Date(this.editData.coupon_pub_end_date).toISOString()
          : null
      );

      axios
        .post(`${import.meta.env.VITE_API_URL}/updatePromo.php`, formData, {
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
    isChecked() {
      this.editData.marquee_state = !this.editData.marquee_state ? 1 : 0;
    },
  },
  created() {},
};
</script>
