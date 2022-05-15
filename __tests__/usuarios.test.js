const supertest = require("supertest");
jest.mock("../src/repositorios/usuario");

const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());

describe("Usuários", () => {
  test("Listar usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Tiago",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/73.jpg",
      },
      {
        id: 2,
        nome: "Paulo",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/74.jpg",
      },
    ]);
  });
});
