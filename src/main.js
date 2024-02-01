import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
// 樣式
import "./assets/scss/style.scss";

const app = createApp(App);

// 設定全域的網站名稱
app.config.globalProperties.$siteName = 'GridIsland後台';

app.use(createPinia());
app.use(router);

app.mount("#app");
