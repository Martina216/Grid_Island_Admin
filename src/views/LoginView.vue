<script></script>

<template>
  <main class="login">
    <div class="wrrap">
      <div class="logo">
        <img src="@/assets/images/login/Grid Island.svg">
      </div>
      <span class="pc-h3">後台登入</span>
      <!-- <form method="post"> -->
      <input type="text" class="form-control user"  placeholder="請輸入使用者帳號" v-model="account">
      <input type="password" class="form-control"  placeholder="請輸入使用者密碼" v-model="au4a83">
      <button class="btn btn-light rounded-pill padding" @click="login">登入</button>
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
      account: 'griddy123',
      au4a83: 'griddy123'
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
                  this.updateToken(res.data.empInfo)
                  this.updateUserData(res.data.empInfo)
                  this.$router.push('/home')
              } else {
                  alert('登入失敗，請檢查帳號密碼是否正確。')
              }
          }
      }).catch(error => {
          console.log(error);
      })
    },
  },
};
</script>



