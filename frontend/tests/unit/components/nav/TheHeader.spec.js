import { createLocalVue, mount } from "@vue/test-utils";
import TheHeader from "@/components/nav/TheHeader.vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

describe("The header", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  let vuetify;
  let wrapper;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should exist", () => {
    wrapper = mount(TheHeader, {
      localVue,
      vuetify,
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("logs out on logout button press", async () => {
    wrapper = mount(TheHeader, {
      localVue,
      vuetify,
      router,
    });

    const spy = jest.spyOn(wrapper.vm.$router, "push").mockReturnValue();

    await wrapper.findComponent({ ref: "logOutBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });
});
