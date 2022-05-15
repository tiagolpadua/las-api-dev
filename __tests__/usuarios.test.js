const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API de Usuários", () => {
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
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/75.jpg",
      },
      {
        id: 3,
        nome: "Pedro",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/99.jpg",
      },
    ]);
  });
});
