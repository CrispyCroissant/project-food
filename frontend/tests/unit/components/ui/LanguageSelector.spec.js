import { createLocalVue, mount } from "@vue/test-utils";
import LanguageSelector from "@/components/ui/LanguageSelector.vue";
import Vuetify from "vuetify";
import Vuex from "vuex";

describe("The selector", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify;
  let wrapper;
  document.body.setAttribute("data-app", true); // Fixes some strange warning

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(LanguageSelector, {
      localVue,
      vuetify,
      mocks: { $i18n: { locale: "" } },
      store: new Vuex.Store({
        state: { locale: "" },
        mutations: { setLocale: jest.fn() },
      }),
    });
  });

  afterEach(() => {
    wrapper.destroy();
    jest.clearAllMocks();
    Object.defineProperty(window, "navigator", {
      value: { language: "en", split: () => jest.fn() },
      writable: true,
    });
  });

  it("should exist", () => {
    expect(wrapper).toBeDefined();
  });

  it("should fallback to english if user locale is not supported", () => {
    Object.defineProperty(window, "navigator", {
      value: { language: "nonExistent", split: () => jest.fn() },
      writable: true,
    });

    const countryProp = wrapper
      .findComponent({ ref: "currentFlag" })
      .props("country");

    expect(countryProp).toBe("gb");
  });

  it("should show the british flag if locale is english", () => {
    Object.defineProperty(window, "navigator", {
      value: { language: "en", split: () => jest.fn() },
      writable: true,
    });

    const countryProp = wrapper
      .findComponent({ ref: "currentFlag" })
      .props("country");

    expect(countryProp).toBe("gb");
  });

  it("should show the swedish flag if locale is swedish", () => {
    Object.defineProperty(window, "navigator", {
      value: { language: "sv", split: () => jest.fn() },
      configurable: true,
    });

    wrapper = mount(LanguageSelector, {
      localVue,
      vuetify,
      mocks: { $i18n: { locale: "" } },
      store: new Vuex.Store({
        state: { locale: "" },
        mutations: { setLocale: jest.fn() },
      }),
    });

    const countryProp = wrapper
      .findComponent({ ref: "currentFlag" })
      .props("country");

    expect(countryProp).toBe("swe");
  });

  it("should show the polish flag if locale is polish", () => {
    Object.defineProperty(window, "navigator", {
      value: { language: "pl", split: () => jest.fn() },
      configurable: true,
    });

    wrapper = mount(LanguageSelector, {
      localVue,
      vuetify,
      mocks: { $i18n: { locale: "" } },
      store: new Vuex.Store({
        state: { locale: "" },
        mutations: { setLocale: jest.fn() },
      }),
    });

    const countryProp = wrapper
      .findComponent({ ref: "currentFlag" })
      .props("country");

    expect(countryProp).toBe("pl");
  });

  it("should change to the swedish flag if clicked on", async () => {
    await wrapper.findComponent({ ref: "langBtn" }).trigger("click");
    await wrapper.find("#swe").trigger("click");

    const countryProp = wrapper
      .findComponent({ ref: "currentFlag" })
      .props("country");

    expect(countryProp).toBe("swe");
  });

  it("should change to the polish flag if clicked on", async () => {
    Object.defineProperty(window, "navigator", {
      value: { language: "en", split: () => jest.fn() },
      configurable: true,
    });

    await wrapper.findComponent({ ref: "langBtn" }).trigger("click");
    await wrapper.find("#pl").trigger("click");

    const countryProp = wrapper
      .findComponent({ ref: "currentFlag" })
      .props("country");

    expect(countryProp).toBe("pl");
  });

  it("should change to the british flag if clicked on", async () => {
    Object.defineProperty(window, "navigator", {
      value: { language: "pl", split: () => jest.fn() },
      configurable: true,
    });

    wrapper = mount(LanguageSelector, {
      localVue,
      vuetify,
      mocks: { $i18n: { locale: "" } },
      store: new Vuex.Store({
        state: { locale: "" },
        mutations: { setLocale: jest.fn() },
      }),
    });

    await wrapper.findComponent({ ref: "langBtn" }).trigger("click");
    await wrapper.find("#gb").trigger("click");

    const countryProp = wrapper
      .findComponent({ ref: "currentFlag" })
      .props("country");

    expect(countryProp).toBe("gb");
  });

  it("should change the locale to swedish if clicked on", async () => {
    await wrapper.findComponent({ ref: "langBtn" }).trigger("click");
    await wrapper.find("#swe").trigger("click");

    expect(wrapper.vm.$i18n.locale).toBe("sv");
  });

  it("should change the locale to english if clicked on", async () => {
    Object.defineProperty(window, "navigator", {
      value: { language: "swe", split: () => jest.fn() },
      writable: true,
    });

    wrapper = mount(LanguageSelector, {
      localVue,
      vuetify,
      mocks: { $i18n: { locale: "" } },
      store: new Vuex.Store({
        state: { locale: "" },
        mutations: { setLocale: jest.fn() },
      }),
    });

    await wrapper.findComponent({ ref: "langBtn" }).trigger("click");
    await wrapper.find("#gb").trigger("click");

    expect(wrapper.vm.$i18n.locale).toBe("en");
  });

  it("should change the locale to polish if clicked on", async () => {
    await wrapper.findComponent({ ref: "langBtn" }).trigger("click");
    await wrapper.find("#pl").trigger("click");

    expect(wrapper.vm.$i18n.locale).toBe("pl");
  });

  it("will use the stored vuex locale upon creation if it's been set", () => {
    const spy = jest.spyOn(LanguageSelector.methods, "setFlag");

    wrapper = mount(LanguageSelector, {
      localVue,
      vuetify,
      mocks: { $i18n: { locale: "" } },
      store: new Vuex.Store({
        state: { locale: "sv" },
        mutations: { setLocale: jest.fn() },
      }),
    });

    expect(spy).toBeCalledWith("swe");
  });

  it("will commit locale changes to Vuex", () => {
    const mutations = { setLocale: jest.fn() };

    wrapper = mount(LanguageSelector, {
      localVue,
      vuetify,
      mocks: { $i18n: { locale: "" } },
      store: new Vuex.Store({
        state: { locale: "sv" },
        mutations,
      }),
    });

    expect(mutations.setLocale).toBeCalledTimes(1);
    expect(mutations.setLocale).toBeCalledWith({ locale: "sv" }, "sv");
  });
});
