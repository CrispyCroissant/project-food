const request = require("supertest");
const mockingoose = require("mockingoose");
const app = require("../../app");
const User = require("../../models/user");

afterEach(() => {
    jest.clearAllMocks();
    mockingoose.resetAll();
});

describe("POST /api/register", () => {
    const route = "/api/register";

    it("should exist", async () => {
        const creds = {
            email: "correct@email.com",
            password: "password123",
        };

        const res = await request(app).post(route).send(creds);

        expect(res).toBeDefined();
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
    });

    it("should return status 400 if email is missing", async () => {
        const creds = {
            password: "password123",
        };

        const res = await request(app).post(route).send(creds);

        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Email is required!");
    });

    it("should return status 400 if password is missing", async () => {
        const creds = {
            email: "email@email.com",
        };

        const res = await request(app).post(route).send(creds);

        expect(res).toBeDefined();
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Password is required!");
    });

    it("should return status 401 if password is invalid", async () => {
        const returnedUser = {
            email: "email@email.com",
            password: await User.hashPassword("password123"),
        };

        const creds = {
            email: "email@email.com",
            password: "123",
        };

        mockingoose(User).toReturn(returnedUser, "findOne");

        const res = await request(app).post(route).send(creds);

        expect(res).toBeDefined();
        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Password is invalid!");
    });
});

describe("POST /api/confirm/:id", () => {
    const route = "/api/confirm/1";

    it("should exist", async () => {
        const res = await request(app).get(route);

        expect(res).toBeDefined();
    });

    it("should update the users confirmation status if found", async () => {
        const newUser = {
            _id: "1",
            email: "test@email.com",
            password: "blahblah",
            emailConfirmed: false,
        };

        mockingoose(User).toReturn(newUser, "findOne");

        const spy = jest
            .spyOn(User.prototype, "save")
            .mockImplementationOnce(() => Promise.resolve());

        const res = await request(app).get(route);

        expect(res).toBeDefined();
        expect(res.status).toBe(301);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should return status 404 if ID not found", async () => {
        const res = await request(app).get(route);

        expect(res).toBeDefined();
        expect(res.status).toBe(404);
    });
});

jest.mock("../../middleware/sessionAuth", () =>
    jest.fn((req, __, next) => {
        next();
    })
);

describe("POST /api/logout", () => {
    const route = "/api/logout";

    it("should exist", async () => {
        const res = await request(app).post(route);

        expect(res.status).toBeDefined();
    });

    it("should return 200 if session was deleted", async () => {
        const res = await request(app).post(route);

        expect(res.status).toBe(200);
    });
});

describe("GET /api/isAuth", () => {
    const route = "/api/isAuth";

    // It's just a wrapper for the sessionAuth middleware, really.
    it("should exist", async () => {
        const res = await request(app).post(route);

        expect(res.status).toBeDefined();
    });
});
