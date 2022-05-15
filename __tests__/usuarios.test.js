const supertest = require("supertest");
jest.mock("../src/repositorios/usuario");
jest.mock("node-fetch");

const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());

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
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/74.jpg",
      },
    ]);
  });

  test("Buscar usuário por id existente", async () => {
    const resp = await request.get("/usuarios/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      nome: "Tiago",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/73.jpg",
    });
  });

  test("Buscar por id inexistente", async () => {
    const resp = await request.get("/usuarios/999");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar usuário com dados válidos", async () => {
    const resp = await request.post("/usuarios").send({
      nome: "Pedro",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/77.jpg",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id: 99,
      nome: "Pedro",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/77.jpg",
    });
  });

  test("Adicionar usuário com dados inválidos", async () => {
    const respNomeDuplicado = await request.post("/usuarios").send({
      nome: null,
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/77.jpg",
    });
    expect(respNomeDuplicado.statusCode).toBe(400);
    expect(respNomeDuplicado.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);

    const respNomeInvalido = await request.post("/usuarios").send({
      nome: null,
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/77.jpg",
    });
    expect(respNomeInvalido.statusCode).toBe(400);
    expect(respNomeInvalido.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);

    const respUrlInvalida = await request.post("/usuarios").send({
      nome: "Fernando",
      urlFotoPerfil: "https://xxxxxxxxxxx",
    });
    expect(respUrlInvalida.statusCode).toBe(400);
    expect(respUrlInvalida.body).toEqual([
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });

  // Dados pessoais
  test("Buscar dados pessoais do usuário por id existente", async () => {
    const resp = await request.get("/usuarios/1/dados-pessoais");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      cpf: "11122233312",
      dataNascimento: "1970-11-16T03:00:00.000Z",
      nomeCompleto: "Tiago Foo Bar",
      rg: "123456 SSP DF",
    });
  });

  test("Buscar dados pessoais do usuário por id inexistente", async () => {
    const resp = await request.get("/usuarios/999/dados-pessoais");
    expect(resp.statusCode).toBe(404);
  });
});
