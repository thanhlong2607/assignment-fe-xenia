import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

//import css
import "./assets/scss/index.css";
import "./assets/scss/index.scss";
import i18n from "@/locate/i18n.js";

createApp(App).use(store).use(router).use(ElementPlus).use(i18n).mount("#app");
