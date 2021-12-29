import { mount, createLocalVue } from "@vue/test-utils";
import FoodListCardDialog from "@/components/Dashboard/FoodListCardDialog.vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

describe("The card", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let wrapper;
  let vuetify;
  document.body.setAttribute("data-app", true); // Fixes some strange warning

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should exist", () => {
    wrapper = mount(FoodListCardDialog, { localVue, vuetify });

    expect(wrapper.exists()).toBe(true);
  });

  test("the add button should add a recipe", async () => {
    const actions = { addRecipe: jest.fn() };

    wrapper = mount(FoodListCardDialog, {
      localVue,
      vuetify,
      store: new Vuex.Store({ actions }),
      data() {
        return {
          dialog: true,
        };
      },
    });

    await wrapper.findComponent({ ref: "addBtn" }).trigger("click");

    expect(actions.addRecipe).toBeCalledTimes(1);
  });
});
