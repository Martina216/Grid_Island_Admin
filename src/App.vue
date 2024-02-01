<!-- <template>
  <SideNavBar />
  <NavBar />
  <RouterView />
</template> -->

<template>
  <RouterView v-slot="{ Component, route }">
    <SideNavBar  v-if="route.meta.showBar !== false"  />
    <NavBar  v-if="route.meta.showBar !== false" />
    <component :is="Component" />
  </RouterView>
</template>

<script>
import { RouterView } from "vue-router";
import SideNavBar from "./components/SideNavBar.vue";
import NavBar from "./components/NavBar.vue";

export default {
  data() {
    return {};
  },
  watch:{
    $route(to) {
      const siteName = this.$siteName || 'GridIsland';
      document.title = `${siteName + ' | ' }${to.meta.title ? to.meta.title : ''}`;
    }
  },
  components: {
    SideNavBar,
    NavBar,
  },
  mounted() {},
};
</script>
