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
  addRecipe(state, recipe) {
    state.recipes.push(recipe);
  },
  removeRecipe(state, recipe) {
    const index = state.recipes.findIndex((e) => e === recipe);
    state.recipes.splice(index, 1);
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
  async logOut({ commit }) {
    const response = await axios.post(
      `${process.env.VUE_APP_BACKEND_URL}/logout`
    );

    if (response.status === 200) {
      commit("logOut");
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
  async addRecipe({ commit }, recipe) {
    const response = await axios.post(
      `${process.env.VUE_APP_BACKEND_URL}/recipe/`,
      { recipe }
    );

    if (response.status === 200) {
      commit("addRecipe", recipe);
    } else {
      throw new Error(response.data.error);
    }
  },
  async deleteRecipe({ commit }, recipe) {
    const response = await axios.delete(
      `${process.env.VUE_APP_BACKEND_URL}/recipe/${recipe}`
    );

    if (response.status === 200) {
      commit("removeRecipe", recipe);
    } else {
      throw new Error(response.data.error);
    }
  },
  async isAuthenticated({ commit }) {
    const response = await axios.get(
      `${process.env.VUE_APP_BACKEND_URL}/isAuth`
    );

    if (response.status === 200) {
      commit("logIn");
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
