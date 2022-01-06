import { mount, createLocalVue } from "@vue/test-utils";
import InfoCard from "@/components/Dashboard/InfoCard.vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

describe("The info card", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify;
  let wrapper;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {
        recipes: [],
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should exist", () => {
    wrapper = mount(InfoCard, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("should NOT show an error if there's no error", () => {
    wrapper = mount(InfoCard, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.findComponent({ ref: "errorAlert" }).exists()).toBe(false);
  });

  it("should show an error if there's an error", async () => {
    wrapper = mount(InfoCard, {
      localVue,
      vuetify,
      store,
    });

    await wrapper.setData({ error: "message" });

    expect(wrapper.findComponent({ ref: "errorAlert" }).exists()).toBe(true);
    expect(wrapper.findComponent({ ref: "errorAlert" }).text()).toBe("message");
  });

  it("should show a recipe when created if at least one exists", () => {
    wrapper = mount(InfoCard, {
      localVue,
      vuetify,
      store: new Vuex.Store({
        state: {
          recipes: ["One", "Two"],
        },
      }),
    });

    expect(wrapper.findComponent({ ref: "recipeText" }).exists()).toBe(true);
  });

  it("should NOT show a recipe if there are none", () => {
    wrapper = mount(InfoCard, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.findComponent({ ref: "recipeText" }).exists()).toBe(false);
  });

  it("should NOT show the recipe button if there is no recipe", () => {
    wrapper = mount(InfoCard, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.findComponent({ ref: "recipeBtn" }).exists()).toBe(false);
  });

  it("should show the recipe button if there is a recipe", () => {
    wrapper = mount(InfoCard, {
      localVue,
      vuetify,
      store: new Vuex.Store({
        state: {
          recipes: ["One"],
        },
      }),
    });

    expect(wrapper.findComponent({ ref: "recipeBtn" }).exists()).toBe(true);
  });

  it("should generate a new recipe if the button is pressed", async () => {
    const spy = jest.spyOn(InfoCard.methods, "getRandomRecipe");

    wrapper = mount(InfoCard, {
      localVue,
      vuetify,
      store: new Vuex.Store({
        state: {
          recipes: ["One"],
        },
      }),
    });

    await wrapper.findComponent({ ref: "recipeBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(2);
  });

  it("should set the 'title' text to a specific message if there are no recipes", async () => {
    wrapper = mount(InfoCard, {
      localVue,
      vuetify,
      store,
      mocks: {
        $t: () => "You have no recipes yet!",
      },
    });

    const titleRecipes = wrapper.findComponent({ ref: "titleText" }).text();

    expect(titleRecipes).toBe("You have no recipes yet!");
  });

  it("should set the 'title' text to a specific message if there are recipes", async () => {
    wrapper = mount(InfoCard, {
      localVue,
      vuetify,
      store: new Vuex.Store({
        state: {
          recipes: ["One"],
        },
      }),
      mocks: {
        $t: () => "Your next recipe is",
      },
    });

    const titleRecipes = wrapper.findComponent({ ref: "titleText" }).text();

    expect(titleRecipes).toBe("Your next recipe is");
  });

  it("should watch the Vuex store for changes", async () => {
    wrapper = mount(InfoCard, {
      localVue,
      vuetify,
      store: new Vuex.Store({
        state: {
          recipes: ["One"],
        },
      }),
    });
    const spy = jest.spyOn(wrapper.vm, "getRandomRecipe");

    wrapper.vm.$store.state.recipes = ["two"];
    await wrapper.vm.$nextTick();

    expect(spy).toBeCalledTimes(1);
  });
});
