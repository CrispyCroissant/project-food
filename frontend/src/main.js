import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import i18n from './i18n'

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  axios,
  i18n,
  render: (h) => h(App)
}).$mount("#app");
