<script></script>

<template>
  <main class="login">
    <div class="warning">
      <span>想一覽Griddy的機密嗎？</span>
      <span>請使用 1024 * 768 以上之螢幕解析度的瀏覽器！</span>
    </div>
    <div class="wrrap">
      <div class="logo">
        <img src="@/assets/images/login/Grid Island.svg">
      </div>
      <!-- <form method="post"> -->
      <div class="form-floating mb-3 user">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"  v-model="account" @keyup.enter="login">
        <label for="floatingInput">使用者帳號</label>
      </div>
      <div class="form-floating word">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="au4a83" @keyup.enter="login">
        <label for="floatingPassword">使用者密碼</label>
      </div>
      <button class="btn btn-light rounded-pill padding loginBtn" @click="login" @keyup.enter="login">登入</button>
      <!-- </form> -->
    </div>
  </main>
</template>

<script>
import { mapActions } from 'pinia'
import userStore from '@/stores/user'
import { RouterView } from 'vue-router'
import apiInstance from '@/plugins/auth'
export default {
  data() {
    return {
      account: '',
      au4a83: ''
    };
  },
  methods: {
    ...mapActions(userStore, ['updateToken', 'updateName', 'checkLogin', 'updateUserData']),

    login() {
      const bodyFormData = new FormData();
      bodyFormData.append('emp_account', this.account);
      bodyFormData.append('emp_psw', this.au4a83);

      // 請記得將php埋入跨域
      apiInstance({
          method: 'post',
          url: `${import.meta.env.VITE_API_URL}/loginCheck.php`,
          headers: { "Content-Type": "multipart/form-data" },
          data: bodyFormData
      }).then(res => {
          if (res && res.data) {
              if (res.data.code == 1) {
                  // console.log(res.data)
                  this.updateToken(res.data.session_id)
                  this.updateUserData(res.data.empInfo)
                  this.$router.push('/home')
              } else {
                alert('登入失敗，請檢查帳號密碼是否正確。')
                }
              }
            }).catch(error => {
              // console.log(error);
              alert('請聯繫系統管理員或維護單位')
      })
    },
  },
};
</script>



