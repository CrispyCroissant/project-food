import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = {
  isLoggedIn: false,
  recipes: [],
};
export const mutations = {
  logIn(state) {
    state.isLoggedIn = true;
  },
  logOut(state) {
    state.isLoggedIn = false;
  },
};
export const actions = {};
export const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {},
});
