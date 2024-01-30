<template>
  <router-link :to="cardLink">
    <div class="homeCard">
      <i :class="cardIcon"></i>
      <h3>{{ cardCount }}</h3>
      <h3>{{ cardName }}</h3>
    </div>
  </router-link>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["cardIcon", "cardCount", "cardName", "cardLink"],
  methods: {},
  mounted() {},
};
</script>
