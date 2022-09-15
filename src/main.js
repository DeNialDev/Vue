import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'ant-design-vue/es/message/style/css'; //use ant-design-vue/es instead of ant-design-vue/lib

import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount("#app");
