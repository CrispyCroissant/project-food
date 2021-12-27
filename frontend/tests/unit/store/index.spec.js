import axios from "axios";
import { state, mutations, actions } from "../../../src/store";

jest.mock("axios");

describe("The store", () => {
  describe("The state", () => {
    it("has a loggedIn status state", () => {
      expect(state.isLoggedIn).toBeDefined();
      expect(state.isLoggedIn).toBe(false);
    });

    it("has an array of recipes", () => {
      expect(state.recipes).toEqual([]);
    });
  });

  describe("The mutations", () => {
    it("has a mutation which sets the loggedIn status to true", () => {
      mutations.logIn(state);

      expect(state.isLoggedIn).toBe(true);
    });

    it("has a mutation which sets the loggedIn status to false", () => {
      mutations.logOut(state);

      expect(state.isLoggedIn).toBe(false);
    });
  });

  describe("The actions", () => {
    it("has a method for authenticating on the backend", () => {
      expect(actions.attemptLogin).toBeDefined();
    });

    it("sets the loggedIn status to true if the call is successful", async () => {
      axios.post.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

      const context = {
        commit: () => mutations.logIn(state),
      };

      await actions.attemptLogin(context, { email: "e", password: "p" });

      expect(state.isLoggedIn).toBe(true);
    });
  });
});
