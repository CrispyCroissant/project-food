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
    store = { state: { recipes: [] } };
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

  test("the delete button should delete the recipe", async () => {
    const actions = { deleteRecipe: jest.fn() };

    wrapper = mount(FoodListCard, {
      localVue,
      vuetify,
      store: new Vuex.Store({ state: { recipes: ["one", "two"] }, actions }),
    });

    await wrapper.findComponent({ ref: "deleteBtn" }).trigger("click");

    expect(actions.deleteRecipe).toBeCalledTimes(1);
  });
});
