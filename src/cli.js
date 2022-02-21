const { listarProdutos } = require("./api-service");
const { formatarValor } = require("./objetos");
// const pegaArquivo = require("./index");
// const validaURLs = require("./http-validacao");

function areWeTestingWithJest() {
  return process.env.JEST_WORKER_ID !== undefined;
}

async function processarOpcao(opcao) {
  if (!opcao) {
    throw new Error(`Informe uma opção válida: listar`);
  } else if (opcao === "listar") {
    const produtos = await listarProdutos();
    return produtos;
  } else if (opcao === "listar-formatado") {
    let produtos = await listarProdutos();
    produtos = produtos.map((p) => ({ ...p, preco: formatarValor(p.preco) }));
    return produtos;
  } else {
    throw new Error(`Opção inválida: ${opcao}`);
  }
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
