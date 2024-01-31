<script></script>

<template>
  <main class="login">
    <div class="wrrap">
      <div class="logo">
        <img src="@/assets/images/login/Grid Island.svg">
      </div>
      <span class="pc-h3">後台登入</span>
      <form method="post">
        <input type="text" class="form-control user" id="exampleInput" placeholder="請輸入使用者帳號">
        <input type="password" class="form-control" id="exampleInput" placeholder="請輸入使用者密碼">
        <button type="button" class="btn btn-light rounded-pill padding" @click="login">登入</button>
      </form>
    </div>
  </main>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  computed: {
    login() {
      this.$router.push('/home');
    },
  },
  created() {
  },
  methods: {
  },
  mounted() {},
};
</script>



