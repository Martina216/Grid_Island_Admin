<template>
    <nav class="navbar bg-blue sticky-top">
      <div class="container-fluid justify-content-end">
        <span class="mb-0 fs-6 me-3">店長，你好</span>
        <button class="btn btn-light rounded-pill padding" @click="logout">
            登出
        </button>
      </div>
    </nav>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    logout(){
      localStorage.removeItem('userToken')
      this.$router.push('/')
    }
  },
  mounted() {},
};
</script>
