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
      account: 'charmy101@gmail.com',
      au4a83: 'charmy101'
    };
  },
  computed: {
  },
  created() {
    // 判斷有沒有登入過，如果沒有token等同於沒有登入
    const user = this.checkLogin()
    if(user){
      //有登入資訊轉到首頁
      this.$router.push('/')
    }
  },
  methods: {
    ...mapActions(userStore, ['updateToken', 'updateName', 'checkLogin', 'updateUserData']),

    login(){
        const bodyFormData = new FormData();
        bodyFormData.append('mem_account', this.account);
        bodyFormData.append('mem_psw', this.au4a83);

    // 請記得將php埋入跨域
      apiInstance({
          method: 'post',
          url: '/getConfirmMember.php',
          headers: { "Content-Type": "multipart/form-data" },
          data: bodyFormData
        }).then(res=>{
          // console.log(res);
          if(res && res.data){
            if(res.data.code == 1){
                this.updateToken(res.data.session_id)
                this.updateUserData(res.data.memInfo)
                this.$router.push('/home')

            }else{
                alert('註冊失敗')
            }
          }
        }).catch(error=>{
          console.log(error);
        })
      },
    // register(){
    //     this.$router.push({ 
    //         name: 'register'
    //     }) 
    // }
  },
  mounted() {},
};
</script>



