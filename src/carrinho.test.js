const {
  listarProdutos,
  listarCategorias,
  listarCuponsValidos,
} = require("./api-service");

const { askQuestion } = require("./ask-question");

jest.mock("./api-service");
jest.mock("./ask-question");

const {
  imprimirOpcoes,
  carregarDadosDaAPI,
  processarOpcao,
  run,
  esvaziarCarrinho,
} = require("./carrinho");

const PRODUTOS_MOCK = require("../mocks/produtos.json");
const CATEGORIAS_MOCK = require("../mocks/categorias.json");
const CUPONS_MOCK = require("../mocks/cupons.json");

describe("Desafio", () => {
  // Crie uma interface com testes em linha de comandos que:
  // 1 - Liste os produtos
  // 2 - Inclua um produto no carrinho
  // 3 - Visualize o carrinho
  // 4 - Finalize a compra e pergunte pelo cupom de desconto
  // x - Saia do sistema

  beforeEach(() => {
    console.log = jest.fn();
    console.table = jest.fn();
    console.error = jest.fn();
    listarProdutos.mockResolvedValue(PRODUTOS_MOCK);
    listarCategorias.mockResolvedValue(CATEGORIAS_MOCK);
    listarCuponsValidos.mockResolvedValue(CUPONS_MOCK);
    carregarDadosDaAPI();
    esvaziarCarrinho();
    askQuestion.mockClear();
  });

  test("Deve imprimir as opções.", () => {
    imprimirOpcoes();
    expect(console.log.mock.calls).toEqual([
      ["Escolha uma opção:"],
      ["1 - Listar produtos"],
      ["2 - Incluir produto no carrinho"],
      ["3 - Visualizar carrinho"],
      ["4 - Finalizar compra"],
      ["x - Sair"],
    ]);
  });

  test("Deve sair se informar x.", async () => {
    askQuestion.mockResolvedValue("x");
    await run();
    expect(JSON.stringify(console.log.mock.calls)).toEqual(
      '[["Escolha uma opção:"],["1 - Listar produtos"],["2 - Incluir produto no carrinho"],["3 - Visualizar carrinho"],["4 - Finalizar compra"],["x - Sair"],["Adeus..."],["\\n"]]'
    );
  });

  test("Deve recusar uma opção inválida.", async () => {
    processarOpcao("999");
    expect(JSON.stringify(console.error.mock.calls)).toEqual(
      '[["Opção inválida: 999"]]'
    );
  });

  test("Deve listar os produtos com a opção 1.", async () => {
    processarOpcao("1");
    expect(JSON.stringify(console.log.mock.calls)).toEqual(
      '[["Lista de Produtos:"],["\\n"]]'
    );
    expect(JSON.stringify(console.table.mock.calls)).toEqual(
      '[[[{"nome":"Confete","categoria":"Infantil","preco":30,"desconto":30},{"nome":"Serpentina","categoria":"Infantil","preco":10,"desconto":30},{"nome":"Cerveja","categoria":"Bebida","preco":7,"desconto":0},{"nome":"Refrigerante","categoria":"Bebida","preco":8,"desconto":0},{"nome":"Fruta","categoria":"Alimentação","preco":12,"desconto":15}]]]'
    );
  });

  test("Não deve incluir um produto no carrinho com a opção 2 se o código for inválido.", async () => {
    askQuestion.mockResolvedValue("999999");
    await processarOpcao("2");
    expect(JSON.stringify(console.error.mock.calls)).toEqual(
      '[["Produto não localizado: 999999"]]'
    );
  });

  test("Não deve incluir um produto no carrinho com a opção 2 se a quantidade for inválida.", async () => {
    askQuestion.mockResolvedValueOnce("1");
    askQuestion.mockResolvedValueOnce("a");
    await processarOpcao("2");
    expect(JSON.stringify(console.error.mock.calls)).toEqual(
      '[["Quantidade inválida: NaN"]]'
    );
  });

  test("Deve incluir um produto no carrinho com a opção 2 se o código do produto e a quantidade estiverem corretos.", async () => {
    askQuestion.mockResolvedValueOnce("1");
    askQuestion.mockResolvedValueOnce("2");
    await processarOpcao("2");
    expect(JSON.stringify(console.log.mock.calls)).toEqual(
      '[["Produto incluído com sucesso no carrinho."],["\\n"]]'
    );

    askQuestion.mockResolvedValueOnce("1");
    askQuestion.mockResolvedValueOnce("2");
    await processarOpcao("2");

    expect(JSON.stringify(console.log.mock.calls)).toEqual(
      '[["Produto incluído com sucesso no carrinho."],["\\n"],["Produto incluído com sucesso no carrinho."],["\\n"]]'
    );
  });

  test("Deve imprimir o carrinho com a opção 3.", async () => {
    askQuestion.mockResolvedValueOnce("1");
    askQuestion.mockResolvedValueOnce("2");

    await processarOpcao("2");
    await processarOpcao("3");

    expect(JSON.stringify(console.log.mock.calls)).toEqual(
      '[["Produto incluído com sucesso no carrinho."],["\\n"],["Carrinho de Compras:"],["\\n"]]'
    );

    expect(JSON.stringify(console.table.mock.calls)).toEqual(
      '[[[{"id":1,"nome":"Serpentina","categoria":"Infantil","preco":10,"desconto":30,"qtd":2,"valor":14}]]]'
    );
  });

  test("Deve concluir a compra com a opção 4.", async () => {
    askQuestion.mockResolvedValueOnce("1");
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("ALURANUX");
    askQuestion.mockResolvedValueOnce("10");

    await processarOpcao("2");

    await processarOpcao("4");

    expect(JSON.stringify(console.table.mock.calls)).toEqual(
      '[[[{"id":1,"nome":"Serpentina","categoria":"Infantil","preco":10,"desconto":30,"qtd":2,"valor":14}]]]'
    );

    expect(JSON.stringify(console.log.mock.calls)).toEqual(
      '[["Produto incluído com sucesso no carrinho."],["\\n"],["Concluir compra:"],["Subtotal: R$ 14,00"],["Total: R$ 12,60"],["Compra finalizada com sucesso!"],["\\n"]]'
    );
  });

  test("Deve recusar a compra com a opção 4 com cupom inválido.", async () => {
    askQuestion.mockResolvedValueOnce("1");
    askQuestion.mockResolvedValueOnce("2");
    askQuestion.mockResolvedValueOnce("CUPOM-INVALIDO");

    await processarOpcao("2");

    await processarOpcao("4");

    expect(JSON.stringify(console.error.mock.calls)).toEqual(
      '[["Cupom inválido"]]'
    );
  });
});
