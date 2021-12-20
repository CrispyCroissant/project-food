const request = require("supertest");
const mockingoose = require("mockingoose");
const app = require("../../app");

describe("POST /api/recipe", () => {
    const route = "/api/recipe";

    it("should exist", async () => {
        const res = await request(app).post(route);

        expect(res.status).toBe(200);
    });
});

describe("GET /api/recipes", () => {
    const route = "/api/recipes";

    it("should exist", async () => {
        const res = await request(app).get(route);

        expect(res.status).toBe(200);
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
