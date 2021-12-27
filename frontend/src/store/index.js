import axios from "axios";
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
  setRecipes(state, recipesList) {
    state.recipes = recipesList;
  },
};
export const actions = {
  async attemptLogin({ commit }, { email, password }) {
    const response = await axios.post(
      `${process.env.VUE_APP_BACKEND_URL}/login`,
      {
        email,
        password,
      }
    );

    if (response.status === 200) {
      commit("logIn");
    } else {
      throw new Error(response.data.error);
    }
  },
  async getRecipes({ commit }) {
    const response = await axios.get(
      `${process.env.VUE_APP_BACKEND_URL}/recipes`
    );

    if (response.status === 200) {
      commit("setRecipes", response.data.recipes);
    } else {
      throw new Error(response.data.error);
    }
  },
};
export const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {},
});
