const {
  listarProdutos,
  listarCategorias,
  listarCuponsValidos,
} = require("./api-service");
const { askQuestion } = require("./ask-question");
const { formatarValor } = require("./objetos");

let opcao;
let produtos;
let categorias;
let cupons;
let carrinho = [];

async function carregarDadosDaAPI() {
  produtos = await listarProdutos();
  categorias = await listarCategorias();
  cupons = await listarCuponsValidos();

  produtos = produtos.map((p) => {
    const categoria = categorias.find((c) => p.categoria === c.nome);
    const produto = { ...p, desconto: categoria?.desconto || 0 };
    return produto;
  });
}

async function run() {
  await carregarDadosDaAPI();

  do {
    imprimirOpcoes();
    opcao = await askQuestion("Opção: ");
    await processarOpcao(opcao);
  } while (opcao !== "x");
}

function imprimirOpcoes() {
  console.log("Escolha uma opção:");
  console.log("1 - Listar produtos");
  console.log("2 - Incluir produto no carrinho");
  console.log("3 - Visualizar carrinho");
  console.log("4 - Finalizar compra");
  console.log("x - Sair");
}

async function processarOpcao(opcao) {
  if (opcao === "1") {
    console.log("Lista de Produtos:");
    console.table(produtos);
  } else if (opcao === "2") {
    let codProduto = await askQuestion(
      "Qual código de produto deseja incluir no carrinho?"
    );
    codProduto = parseInt(codProduto);
    const produto = produtos[codProduto];
    if (!produto) {
      console.error(`Produto não localizado: ${codProduto}`);
      return;
    }
    let qtd = await askQuestion(
      "Quantas unidades deseja adicionar ao carrinho?"
    );
    qtd = parseInt(qtd);
    if (!qtd) {
      console.error(`Quantidade inválida: ${qtd}`);
      return;
    }
    let item = carrinho.find((i) => i.id === codProduto);
    if (item) {
      item.qtd = item.qtd + qtd;
      item.valor = item.preco * item.qtd;
      item.valor = item.valor - item.valor * (item.desconto / 100);
    } else {
      item = { id: codProduto, ...produto, qtd, valor: produto.preco * qtd };
      item.valor = item.valor - item.valor * (item.desconto / 100);
      carrinho.push(item);
    }
    console.log("Produto incluído com sucesso no carrinho.");
  } else if (opcao === "3") {
    console.log("Carrinho de Compras:");
    console.table(carrinho);
  } else if (opcao === "4") {
    console.log("Concluir compra:");
    console.table(carrinho);
    const subtotal = carrinho.reduce((v, i) => i.valor + v, 0);
    console.log(`Subtotal: ${formatarValor(subtotal)}`);
    let cupom = await askQuestion("Qual o nome do cupom?");
    let descontoCupom = 0;
    if (cupom) {
      if (!cupons.find((c) => c === cupom)) {
        console.error("Cupom inválido");
        return;
      }

      descontoCupom = await askQuestion("Qual o desconto do cupom?");
      descontoCupom = parseInt(descontoCupom);
    }
    const total = subtotal - subtotal * (descontoCupom / 100);
    console.log(`Total: ${formatarValor(total)}`);
    console.log("Compra finalizada com sucesso!");
  } else if (opcao === "x") {
    console.log("Adeus...");
  } else {
    console.error(`Opção inválida: ${opcao}`);
  }
  console.log("\n");
}

if (require.main === module) {
  run();
}

function esvaziarCarrinho() {
  carrinho = [];
}

module.exports = {
  run,
  esvaziarCarrinho,
  askQuestion,
  imprimirOpcoes,
  processarOpcao,
  carregarDadosDaAPI,
};
