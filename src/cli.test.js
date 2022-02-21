const { processarOpcao } = require("./cli");
const { listarProdutos } = require("./api-service");

const PRODUTOS_MOCK = require("../mocks/produtos.json");
const PRODUTOS_FORMATADO_MOCK = require("../mocks/produtos-formatado.json");

jest.mock("./api-service");

describe("Essencial", () => {
  test("Deve emitir erro se informar uma opção inválida.", async () => {
    await expect(processarOpcao("kkkk")).rejects.toThrow(
      "Opção inválida: kkkk"
    );
  });

  test("Deve emitir erro não informar uma opção.", async () => {
    await expect(processarOpcao()).rejects.toThrow(
      "Informe uma opção válida: listar"
    );
  });

  test("Deve listar os produtos.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    const produtos = await processarOpcao("listar");
    expect(produtos).toEqual(PRODUTOS_MOCK);
  });

  test("Deve listar os produtos com preço formatado.", async () => {
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    const produtos = await processarOpcao("listar-formatado");
    expect(produtos).toEqual(PRODUTOS_FORMATADO_MOCK);
  });
});

describe("Desejável", () => {});

describe("Desafio", () => {});
