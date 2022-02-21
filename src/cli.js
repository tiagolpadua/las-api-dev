const { listarProdutos, listarCategorias } = require("./api-service");
const { formatarValor } = require("./objetos");

function areWeTestingWithJest() {
  return process.env.JEST_WORKER_ID !== undefined;
}

async function processarOpcao(opcao) {
  if (!opcao) {
    throw new Error(`Informe uma opção.`);
  } else if (opcao === "produtos") {
    const produtos = await listarProdutos();
    return produtos;
  } else if (opcao === "produtos-formatados") {
    let produtos = await listarProdutos();
    produtos = formataValorProdutos(produtos);
    return produtos;
  } else if (opcao === "categorias") {
    const categorias = await listarCategorias();
    return categorias;
  } else if (opcao === "descontos") {
    let produtos = await listarProdutos();
    produtos = formataValorProdutos(produtos);
    const categorias = await listarCategorias();
    produtos = produtos.map((p) => {
      const categoria = categorias.find((c) => p.categoria === c.nome);
      const produto = { ...p, desconto: categoria?.desconto || 0 };
      return produto;
    });
    return produtos;
  } else {
    throw new Error(`Opção inválida: ${opcao}`);
  }
}

function formataValorProdutos(produtos) {
  return produtos.map((p) => ({ ...p, preco: formatarValor(p.preco) }));
}

async function run() {
  const opcao = process.argv[2];
  const saida = await processarOpcao(opcao);
  console.table(saida);
}

if (areWeTestingWithJest()) {
  console.log("Runnint tests...");
} else {
  run();
}

module.exports = {
  processarOpcao,
};
