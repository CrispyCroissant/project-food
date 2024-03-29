import axios from "axios";
import { state, mutations, actions } from "@/store";

jest.mock("axios");

describe("The store", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("The state", () => {
    it("has a loggedIn status state", () => {
      expect(state.isLoggedIn).toBeDefined();
      expect(state.isLoggedIn).toBe(false);
    });

    it("has an array of recipes", () => {
      expect(state.recipes).toEqual([]);
    });

    it("has a locale state", () => {
      expect(state.locale).toEqual("");
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

    it("has a mutation which sets the locale string", () => {
      mutations.setLocale(state, "test");

      expect(state.locale).toBe("test");
    });

    it("has a mutation which replaces/sets the list of recipes", () => {
      const recipes = ["One", 2, "Three"];

      mutations.setRecipes(state, recipes);

      expect(state.recipes).toEqual(recipes);
    });

    it("has a mutation that removes a recipe from the list of recipes", () => {
      state.recipes = ["One", 2, "Three"];

      mutations.removeRecipe(state, 2);

      expect(state.recipes).toEqual(["One", "Three"]);
    });

    it("has a mutation that adds a recipe to the list of recipes", () => {
      state.recipes = ["One"];

      mutations.addRecipe(state, "Two");

      expect(state.recipes).toEqual(["One", "Two"]);
    });
  });

  describe("The actions", () => {
    describe("auth methods", () => {
      afterEach(() => {
        state.isLoggedIn = false;
      });

      it("has a method for authenticating on the backend", () => {
        expect(actions.attemptLogin).toBeDefined();
      });

      it("has a method for checking the auth session validity", () => {
        expect(actions.isAuthenticated).toBeDefined();
      });

      it("has a method for logging out the user", () => {
        expect(actions.logOut).toBeDefined();
      });

      test("the logout method makes a logout call to the backend", async () => {
        const spy = jest
          .spyOn(axios, "post")
          .mockResolvedValue({ status: 200 });

        const context = {
          commit: () => mutations.logOut(state),
        };

        await actions.logOut(context);

        expect(spy).toBeCalledTimes(1);
      });

      test("the logout method commits loggedIn status change on successful API call", async () => {
        axios.post.mockResolvedValue({ status: 200 });

        const spy = jest.spyOn(mutations, "logOut");

        const context = {
          commit: () => mutations.logOut(state),
        };

        await actions.logOut(context);

        expect(spy).toBeCalledTimes(1);
      });

      test("the auth check method sets the login status if successful", async () => {
        axios.get.mockImplementationOnce(() =>
          Promise.resolve({ status: 200 })
        );

        const context = {
          commit: () => mutations.logIn(state),
        };

        await actions.isAuthenticated(context);

        expect(state.isLoggedIn).toBe(true);
      });

      it("sets the loggedIn status to true if the call is successful", async () => {
        axios.post.mockImplementationOnce(() =>
          Promise.resolve({ status: 200 })
        );

        const context = {
          commit: () => mutations.logIn(state),
        };

        await actions.attemptLogin(context, { email: "e", password: "p" });

        expect(state.isLoggedIn).toBe(true);
      });

      it("throws an error if the API call went bad", async () => {
        axios.post.mockImplementationOnce(() =>
          Promise.reject({ response: { data: { error: "Axios failed!" } } })
        );

        const context = {
          commit: () => mutations.logIn(state),
        };

        expect.assertions(2);
        try {
          await actions.attemptLogin(context, { email: "e", password: "p" });
        } catch (error) {
          expect(error.message).toBe("Axios failed!");
          expect(state.isLoggedIn).toBe(false);
        }
      });

      it("throws an error if the authentication failed", async () => {
        axios.post.mockImplementationOnce(() =>
          Promise.reject({ response: { data: { error: "An error message" } } })
        );

        const context = {
          commit: () => mutations.logIn(state),
        };

        expect.assertions(2);
        try {
          await actions.attemptLogin(context, { email: "e", password: "p" });
        } catch (error) {
          expect(error.message).toBe("An error message");
          expect(state.isLoggedIn).toBe(false);
        }
      });
    });

    describe("recipe methods", () => {
      afterEach(() => {
        state.recipes = [];
      });

      it("should set the current recipe state to the retrieved list of recipes if API call is sucessful", async () => {
        const mockRecipes = ["Recipe1", "Recipe2"];

        axios.get.mockImplementationOnce(() =>
          Promise.resolve({
            data: {
              recipes: mockRecipes,
            },
            status: 200,
          })
        );

        const context = {
          commit: () => mutations.setRecipes(state, mockRecipes),
        };

        expect.assertions(1);
        try {
          await actions.getRecipes(context);
          expect(state.recipes).toEqual(mockRecipes);
        } catch (error) {
          expect(error).not.toBeDefined();
        }
      });

      it("should send an API call to delete a recipe if called", async () => {
        const mockRecipe = "recipe";
        state.recipes = [mockRecipe];

        axios.delete.mockImplementationOnce(() =>
          Promise.resolve({
            data: {
              deletedRecipe: mockRecipe,
            },
            status: 200,
          })
        );

        const context = {
          commit: () => mutations.removeRecipe(state, mockRecipe),
        };

        const spy = jest.spyOn(mutations, "removeRecipe");

        expect.assertions(1);
        try {
          await actions.deleteRecipe(context, mockRecipe);
          expect(spy).toBeCalledTimes(1);
        } catch (error) {
          expect(error).not.toBeDefined();
        }
      });

      it("should send an API call to add a recipe if called", async () => {
        const mockRecipe = "recipe";

        axios.post.mockImplementationOnce(() =>
          Promise.resolve({
            data: {
              recipes: [mockRecipe],
            },
            status: 200,
          })
        );

        const context = {
          commit: () => mutations.addRecipe(state, mockRecipe),
        };

        const spy = jest.spyOn(mutations, "addRecipe");

        expect.assertions(1);
        try {
          await actions.addRecipe(context, mockRecipe);
          expect(spy).toBeCalledTimes(1);
        } catch (error) {
          expect(error).not.toBeDefined();
        }
      });

      it("should throw an error if API call was not successful", async () => {
        axios.get.mockImplementationOnce(() =>
          Promise.reject({ response: { data: { error: "Error message" } } })
        );

        const context = {
          commit: () => mutations.setRecipes(state),
        };

        expect.assertions(2);
        try {
          await actions.getRecipes(context);
        } catch (error) {
          expect(error.message).toBe("Error message");
          expect(state.recipes).toEqual([]);
        }
      });
    });
  });
});
