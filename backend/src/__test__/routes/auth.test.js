const request = require("supertest");
const app = require("../../app");

describe("POST /api/register", () => {
    const route = "/api/register";

    it("should exist", async () => {
        const res = await request(app).post(route);

        expect(res).toBeDefined();
        expect(res.status).toBe(200);
    });
});

describe("POST /api/login", () => {
    const route = "/api/login";

    it("should exist", async () => {
        const res = await request(app).post(route);

        expect(res).toBeDefined();
        expect(res.status).toBe(200);
    });
});

describe("POST /api/confirm/:id", () => {
    const route = "/api/confirm/1";

    it("should exist", async () => {
        const res = await request(app).post(route);

        expect(res).toBeDefined();
        expect(res.status).toBe(200);
    });
});
