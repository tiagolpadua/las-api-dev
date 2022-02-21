const fetch = require("node-fetch");
jest.mock("node-fetch");

const PRODUTOS_MOCK = require("../mocks/produtos.json");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");
const CUPONS_MOCK = require("../mocks/cupons.json");

const {
  listarProdutos,
  listarCategorias,
  listarCuponsValidos,
} = require("./api-service");

describe("Essencial", () => {
  test("Deve ter uma função que lista os produtos.", async () => {
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(PRODUTOS_MOCK),
    });
    const produtos = await listarProdutos();
    expect(produtos).toEqual(PRODUTOS_MOCK);
  });

  test("Deve ter uma função que lista as categorias.", async () => {
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(CATEGORIAS_MOCK),
    });
    const categorias = await listarCategorias();
    expect(categorias).toEqual(CATEGORIAS_MOCK);
  });

  test("Deve ter uma função que lista os cupons válidos.", async () => {
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(CUPONS_MOCK),
    });
    const cupons = await listarCuponsValidos();
    expect(cupons).toEqual(CUPONS_MOCK);
  });

  test("Deve tratar erros 404.", async () => {
    fetch.mockResolvedValue({ status: 404, statusText: "Not found" });
    await expect(listarProdutos()).rejects.toThrow("Not found: 404");
  });
});
