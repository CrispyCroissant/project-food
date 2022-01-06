import { createLocalVue, mount } from "@vue/test-utils";
import TheHeader from "@/components/nav/TheHeader.vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vuex from "Vuex";

describe("The header", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuex);
  let vuetify;
  let wrapper;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
    wrapper = wrapper = mount(TheHeader, {
      localVue,
      vuetify,
      mocks: { $i18n: { locale: "" } },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should show error alert upon error", () => {
    wrapper = mount(TheHeader, {
      localVue,
      vuetify,
      data() {
        return {
          error: "message",
        };
      },
      mocks: { $i18n: { locale: "" } },
    });

    expect(wrapper.findComponent({ ref: "errorAlert" }).exists()).toBe(true);
  });

  it("should NOT show an error alert if there's no error", () => {
    expect(wrapper.findComponent({ ref: "errorAlert" }).exists()).toBe(false);
  });

  it("reroutes on successful logout", async () => {
    const actions = {
      logOut: jest.fn(),
    };

    wrapper = mount(TheHeader, {
      localVue,
      vuetify,
      router,
      store: new Vuex.Store({ actions }),
      mocks: { $i18n: { locale: "" } },
    });

    const spy = jest.spyOn(wrapper.vm.$router, "push").mockResolvedValue();

    await wrapper.findComponent({ ref: "logOutBtn" }).trigger("click");
    await wrapper.vm.$nextTick;

    expect(spy).toBeCalledTimes(1);
  });

  it("logs out on logout button press", async () => {
    const actions = {
      logOut: jest.fn(),
    };

    wrapper = mount(TheHeader, {
      localVue,
      vuetify,
      router,
      store: new Vuex.Store({ actions }),
      mocks: { $i18n: { locale: "" } },
    });

    await wrapper.findComponent({ ref: "logOutBtn" }).trigger("click");

    expect(actions.logOut).toBeCalledTimes(1);
  });
});
