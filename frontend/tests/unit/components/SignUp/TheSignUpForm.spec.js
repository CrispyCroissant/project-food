import { createLocalVue, mount } from "@vue/test-utils";
import TheSignUpForm from "@/components/SignUp/TheSignUpForm.vue";
import Vuetify from "vuetify";
import axios from "axios";
import VueRouter from "vue-router";
import { routes } from "../../../../src/router";

jest.mock("axios");

describe("The sign up form", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  let vuetify;
  let wrapper;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter({ routes });
  });

  afterEach(() => {
    wrapper.destroy();
    jest.resetAllMocks();
  });

  it("should NOT show an error alert if there's no error", () => {
    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
    });
    const errorAlert = wrapper.findComponent({ ref: "errorAlert" });

    expect(errorAlert.exists()).not.toBe(true);
  });

  it("should show an error alert if there's an error", async () => {
    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
    });

    await wrapper.setData({ error: "error message" });

    const errorAlert = wrapper.findComponent({ ref: "errorAlert" });

    expect(errorAlert.exists()).toBe(true);
    expect(errorAlert.text()).toBe("error message");
  });

  it("should mark the email input field as required if empty", async () => {
    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
    });
    const result = wrapper.vm.emailRules[0]("");

    expect(result).not.toBe(true);
  });

  it("should mark the password input field as required if empty", async () => {
    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
    });
    const result = wrapper.vm.passwordRules[0]("");

    expect(result).not.toBe(true);
  });

  it("should NOT mark an input field as required if filled", async () => {
    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
    });
    const emailResult = wrapper.vm.emailRules[0]("T");
    const passwordResult = wrapper.vm.passwordRules[0]("t");

    expect(emailResult).toBe(true);
    expect(passwordResult).toBe(true);
  });

  it("should show error if email is invalid", async () => {
    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
    });
    const result = wrapper.vm.emailRules[1]("T");

    expect(result).not.toBe(true);
  });

  it("should NOT show error if email is valid", async () => {
    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
    });
    const result = wrapper.vm.emailRules[1]("T@e.com");

    expect(result).toBe(true);
  });

  it("validates the sign up form on button click", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
    });
    const spy = jest.spyOn(wrapper.vm, "validate");

    await wrapper.findComponent({ ref: "signUpBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });

  it("registers the user on sign up", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
      router,
    });
    const spy = jest.spyOn(wrapper.vm, "signUp");

    await wrapper.findComponent({ ref: "signUpBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
    expect(wrapper.vm.error).toBe("");
  });

  it("throws an error if sign up failed", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.reject({ response: { data: { error: "Error message" } } })
    );

    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
      router,
      data() {
        return {
          valid: true,
        };
      },
    });

    jest.spyOn(wrapper.vm, "validate").mockImplementationOnce(() => jest.fn());
    jest.spyOn(wrapper.vm.$router, "push").mockResolvedValueOnce(true);

    const spy = jest.spyOn(wrapper.vm, "signUp");

    await wrapper.findComponent({ ref: "signUpBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
    expect(wrapper.vm.error).toBe("Error message");
  });

  it("redirects the user to the login page on successful sign up", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
      router,
      data() {
        return {
          valid: true,
        };
      },
    });

    jest.spyOn(wrapper.vm, "validate").mockImplementationOnce(() => jest.fn());

    const spy = jest.spyOn(wrapper.vm.$router, "push");

    await wrapper.findComponent({ ref: "signUpBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });

  it("redirects the user to the login page on sign in button press", async () => {
    wrapper = mount(TheSignUpForm, {
      localVue,
      vuetify,
      router,
    });

    const spy = jest.spyOn(wrapper.vm.$router, "push").mockReturnValue(true);

    await wrapper.findComponent({ ref: "signInBtn" }).trigger("click");

    expect(spy).toBeCalledTimes(1);
  });
});
