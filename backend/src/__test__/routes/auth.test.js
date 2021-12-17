const request = require("supertest");
const mockingoose = require("mockingoose");
const app = require("../../app");

describe("POST /api/register", () => {
    const route = "/api/register";

    it("should exist", async () => {
        const creds = {
            email: "correct@email.com",
            password: "password123",
        };

        const res = await request(app).post(route).send(creds);

        expect(res).toBeDefined();
        expect(res.status).toBe(200);
    });

    it("should return error if email is not given", async () => {
        const creds = {
            password: "password123",
        };

        const res = await request(app).post(route).send(creds);

        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Email is required!");
    });

    it("should return error if password is not given", async () => {
        const creds = {
            email: "correct@email.com",
        };

        const res = await request(app).post(route).send(creds);

        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Password is required!");
    });

    it("should return status 200 if everything went OK", async () => {
        const creds = {
            email: "correct@email.com",
            password: "password132",
        };

        const res = await request(app).post(route).send(creds);

        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(200);
    });

    it("should return status 400 if user could not be created", async () => {
        const creds = {
            email: "correctcom",
            password: "password132",
        };

        const res = await request(app).post(route).send(creds);

        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
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
