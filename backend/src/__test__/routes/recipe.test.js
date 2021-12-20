const request = require("supertest");
const mockingoose = require("mockingoose");
const User = require("../../models/user");
const app = require("../../app");

jest.mock("../../middleware/sessionAuth", () =>
    jest.fn((req, _, next) => {
        req.session.userID = 1;
        next();
    })
);

describe("POST /api/recipe", () => {
    const route = "/api/recipe";

    it("should exist", async () => {
        const res = await request(app).post(route);

        expect(res.status).toBe(400);
    });

    it("should return 200 if everything went OK", async () => {
        mockingoose(User).toReturn(
            {
                email: "test@email.com",
                password: "blahblah",
                emailConfirmed: true,
            },
            "findOne"
        );

        const res = await request(app).post(route).send({ recipe: "Pasta" });

        expect(res.status).toBe(200);
        expect(res.body.recipes).toContain("Pasta");
    });

    it("should return 400 if recipe was not provided", async () => {
        const res = await request(app).post(route).send();

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("No recipe was provided!");
    });
});

describe("GET /api/recipes", () => {
    const route = "/api/recipes";

    it("should exist", async () => {
        const res = await request(app).get(route);

        expect(res.status).toBe(404);
    });

    it("should return 400 if user couldn't be found", async () => {
        mockingoose(User).toReturn(new Error("Not found"), "findOne");

        const res = await request(app).get(route);

        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toBe("Not found");
    });

    it("should return 404 if user has no recipes", async () => {
        mockingoose(User).toReturn(
            {
                email: "test@email.com",
            },
            "findOne"
        );

        const res = await request(app).get(route);

        expect(res.status).toBe(404);
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toBe("Couldn't find any recipes");
    });

    it("should return all recipes if everything is OK", async () => {
        const recipes = ["Test1", "Test2", "Test3"];

        mockingoose(User).toReturn(
            {
                email: "test@email.com",
                recipes,
            },
            "findOne"
        );

        const res = await request(app).get(route);

        expect(res.status).toBe(200);
        expect(res.body.error).not.toBeDefined();
        expect(res.body.recipes).toEqual(recipes);
    });
});

describe("PATCH /api/recipe", () => {
    const route = "/api/recipe";

    it("should exist", async () => {
        const res = await request(app).patch(route);

        expect(res.status).toBe(200);
    });
});

describe("DELETE /api/recipe", () => {
    const route = "/api/recipe";

    it("should exist", async () => {
        const res = await request(app).delete(route);

        expect(res.status).toBe(200);
    });
});
