const supertest = require("supertest");
jest.mock("../src/repositorios/usuario");

const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());

describe("Home", () => {
  test("URL Base", async () => {
    const resp = await request.get("/");
    expect(resp.statusCode).toBe(200);
    expect(resp.text).toBe("Bem vindo ao LAS-API");
  });
});
