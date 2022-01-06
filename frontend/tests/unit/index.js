import Vue from "vue";
import Vuetify from "vuetify";
import { config } from "@vue/test-utils";
Vue.use(Vuetify);

config.mocks["$t"] = () => {};
