<template>
  <SideNavBar />
  <NavBar />
  <RouterView />
</template>

<script>
import { RouterView } from "vue-router";
import SideNavBar from "./components/SideNavBar.vue";
import NavBar from "./components/NavBar.vue";

export default {
  data() {
    return {};
  },
  components: {
    SideNavBar,
    NavBar,
  },
  mounted() {},
};
</script>
