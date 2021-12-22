import { createLocalVue, mount } from "@vue/test-utils";
import SignIn from "@/views/SignIn.vue";
import Vuetify from "vuetify";
import axios from "axios";

describe("The sign in page", () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should NOT show an error alert if there's no error", () => {
    wrapper = mount(SignIn, {
      localVue,
      vuetify,
    });
    const errorAlert = wrapper.findComponent({ name: "v-alert" });

    expect(errorAlert.exists()).not.toBe(true);
  });

  it("should show an error alert if there's an error", async () => {
    wrapper = mount(SignIn, {
      localVue,
      vuetify,
    });
    const errorText = "An error has occcured!";

    await wrapper.setData({ error: errorText });

    const errorAlert = wrapper.findComponent({ name: "v-alert" });

    expect(errorAlert.exists()).toBe(true);
    expect(errorAlert.text()).toBe(errorText);
  });

  it("should mark an input field as required if empty", async () => {
    wrapper = mount(SignIn, {
      localVue,
      vuetify,
    });
    const result = wrapper.vm.rules.required[0]("");

    expect(result).toBe("Required");
  });

  it("should NOT mark an input field as required if filled", async () => {
    wrapper = mount(SignIn, {
      localVue,
      vuetify,
    });
    const result = wrapper.vm.rules.required[0]("Test");

    expect(result).toBe(true);
  });

  it("validates the login form on sign in", async () => {
    wrapper = mount(SignIn, {
      localVue,
      vuetify,
    });
    const spy = jest.spyOn(wrapper.vm, "validate");
    await wrapper.vm.$forceUpdate();

    await wrapper.findComponent({ ref: "loginBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });

  // TODO: Change this test to use Vuex after a store has been implemented.
  it("sets user login status after successful login", async () => {
    wrapper = mount(SignIn, {
      localVue,
      vuetify,
    });

    await wrapper.setData({ email: "test@email.com" });
    await wrapper.setData({ password: "password123" });

    const spy = jest
      .spyOn(axios, "post")
      .mockResolvedValueOnce({ status: 200 });

    await wrapper.findComponent({ ref: "loginBtn" }).trigger("click");
    await wrapper.vm.$nextTick();

    expect(spy).toBeCalledTimes(1);
    expect(wrapper.vm.isLoggedIn).toBe(true);
  });
});
