import { mount, createLocalVue } from "@vue/test-utils";
import FoodListCardDialog from "@/components/Dashboard/FoodListCardDialog.vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

describe("The dialog", () => {
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

  it("should NOT show an error if there is none", () => {
    wrapper = mount(FoodListCardDialog, {
      localVue,
      vuetify,
      data() {
        return {
          dialog: true,
        };
      },
    });

    const errorAlert = wrapper.findComponent({ ref: "errorAlert" });

    expect(errorAlert.exists()).toBe(false);
  });

  it("should show an error if there is an error", () => {
    wrapper = mount(FoodListCardDialog, {
      localVue,
      vuetify,
      data() {
        return {
          error: "Error message",
          dialog: true,
        };
      },
    });

    const errorAlert = wrapper.findComponent({ ref: "errorAlert" });

    expect(errorAlert.exists()).toBe(true);
    expect(wrapper.vm.error).toBe("Error message");
  });

  it("should close the dialog on button press", async () => {
    wrapper = mount(FoodListCardDialog, {
      localVue,
      vuetify,
      data() {
        return {
          dialog: true,
        };
      },
    });

    await wrapper.findComponent({ ref: "closeBtn" }).trigger("click");

    expect(wrapper.vm.dialog).toBe(false);
  });

  it("should remove any error upon dialog close", async () => {
    wrapper = mount(FoodListCardDialog, {
      localVue,
      vuetify,
      data() {
        return {
          dialog: true,
          error: "Mock",
        };
      },
    });

    await wrapper.findComponent({ ref: "closeBtn" }).trigger("click");

    expect(wrapper.vm.error).toBeFalsy();
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
