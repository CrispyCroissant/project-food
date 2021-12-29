import { mount, createLocalVue } from "@vue/test-utils";
import FoodListCard from "@/components/Dashboard/FoodListCard.vue";
import Vuetify from "vuetify";

describe("The card", () => {
  const localVue = createLocalVue();
  let wrapper;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should exist", () => {
    wrapper = mount(FoodListCard, { localVue, vuetify });

    expect(wrapper.exists()).toBe(true);
  });

  it("should NOT show the list if there's no recipes", () => {
    wrapper = mount(FoodListCard, { localVue, vuetify });

    const list = wrapper.findComponent({ ref: "cardList" });

    expect(list.exists()).toBe(false);
  });

  it("should show a list of recipes if they exist", async () => {
    wrapper = mount(FoodListCard, { localVue, vuetify });

    const exampleList = ["Recipe1", "Recipe2", "Recipe3"];

    await wrapper.setData({ recipes: exampleList });

    const recipeElements = wrapper.findAll({ ref: "recipeList" });

    for (let i = 0; i < recipeElements.length; i++) {
      const recipe = recipeElements.at(i).text();

      expect(recipe).toBe(exampleList[i]);
    }
  });
});
