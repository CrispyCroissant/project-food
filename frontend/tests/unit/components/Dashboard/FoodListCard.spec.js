import { mount, createLocalVue } from "@vue/test-utils";
import FoodListCard from "@/components/Dashboard/FoodListCard.vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

describe("The card", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let wrapper;
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: { recipes: [] },
      actions: { getRecipes: jest.fn() },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should exist", () => {
    wrapper = mount(FoodListCard, { localVue, vuetify, store });

    expect(wrapper.exists()).toBe(true);
  });

  it("should show an error alert if there's an error", () => {
    wrapper = mount(FoodListCard, {
      localVue,
      vuetify,
      store,
      data() {
        return {
          error: "message",
        };
      },
    });

    expect(wrapper.findComponent({ ref: "errorAlert" }).exists()).toBe(true);
  });

  it("should NOT show an error alert if there's no error", () => {
    wrapper = mount(FoodListCard, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.findComponent({ ref: "errorAlert" }).exists()).toBe(false);
  });

  it("should show the correct error message", () => {
    const message = "message";

    wrapper = mount(FoodListCard, {
      localVue,
      vuetify,
      store,
      data() {
        return {
          error: message,
        };
      },
    });

    expect(wrapper.findComponent({ ref: "errorAlert" }).text()).toBe(message);
  });

  it("should NOT show the list if there's no recipes", () => {
    wrapper = mount(FoodListCard, { localVue, vuetify, store });

    const list = wrapper.findComponent({ ref: "cardList" });

    expect(list.exists()).toBe(false);
  });

  it("should show a list of recipes if they exist", async () => {
    wrapper = mount(FoodListCard, { localVue, vuetify, store });

    const exampleList = ["Recipe1", "Recipe2", "Recipe3"];

    await wrapper.setData({ recipes: exampleList });

    const recipeElements = wrapper.findAllComponents({ ref: "recipeList" });

    for (let i = 0; i < recipeElements.length; i++) {
      const recipe = recipeElements.at(i).text();

      expect(recipe).toBe(exampleList[i]);
    }
  });

  it("should update the Vuex store upon creation", async () => {
    const actions = { getRecipes: jest.fn() };

    wrapper = mount(FoodListCard, {
      localVue,
      vuetify,
      store: new Vuex.Store({
        actions,
        state: {
          recipes: ["One"],
        },
      }),
    });

    expect(actions.getRecipes).toBeCalledTimes(1);
  });

  test("the delete button should delete the recipe", async () => {
    const actions = { deleteRecipe: jest.fn(), getRecipes: jest.fn() };

    wrapper = mount(FoodListCard, {
      localVue,
      vuetify,
      store: new Vuex.Store({ state: { recipes: ["one", "two"] }, actions }),
    });

    await wrapper.findComponent({ ref: "deleteBtn" }).trigger("click");

    expect(actions.deleteRecipe).toBeCalledTimes(1);
  });

  it("should have a counter text", async () => {
    store.state.recipes = [1];

    wrapper = mount(FoodListCard, { localVue, vuetify, store });

    const counter = wrapper.findComponent({ ref: "counter" });

    expect(counter.exists()).toBe(true);
  });

  test("the counter should not exist if there's no recipes", async () => {
    wrapper = mount(FoodListCard, {
      localVue,
      vuetify,
      store,
    });

    const counter = wrapper.findComponent({ ref: "counter" });

    expect(counter.exists()).toBe(false);
  });

  test("the counter text should show the amount of recipes", async () => {
    store.state.recipes = ["h", "e", "y"];

    wrapper = mount(FoodListCard, {
      localVue,
      vuetify,
      store,
    });

    // Can't test the actual counter text due to $tc being mocked away.
    const amount = wrapper.vm.recipeAmount;

    expect(amount).toBe(3);
  });
});
