const { listaEhInvalida } = require('./arrays');

//---------------------------------------------------------------------------------------
// Observações:
// Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista
// for vazia, retorne undefined.
//
// Para todos os objetos das atividades, considere as seguintes estruturas:
//
// type Produto = {
//   nome: string,
//   categoria: string,
//   quantidade: number,
//   preco: number,
//   precoFormatado: string
// }
//
// type Categoria = {
//   nome: string,
//   desconto: number
// }
//
// type Cupom = {
//   texto: string,
//   desconto: number
// }
//---------------------------------------------------------------------------------------

// =========
// Essencial
// =========

// Crie uma função que recebe uma lista de produtos e devolve o produto com o menor preço
function obterMenorPreco(produtos) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    }

    let menor = produtos[0];
    for (let i = 1; i < produtos.length; i++) {
        if (menor.preco > produtos[i].preco) {
            menor = produtos[i];
        }
    }
    return menor;
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
function obterMaiorPreco(produtos) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    }

    let maior = produtos[0];
    for (let i = 1; i < produtos.length; i++) {
        if (maior.preco < produtos[i].preco) {
            maior = produtos[i];
        }
    }
    return maior;
}

// Crie uma função que receba uma lista de produtos e devolve uma lista que inclui uma propriedade precoFormatado
// com o valor formatado em Reais
function formatarValor(valor) {
    return 'R$ ' + (Math.round(valor * 100) / 100).toFixed(2).split('.').join(',');
}

function incluirPrecoFormatado(produto) {
    return { ...produto, precoFormatado: formatarValor(produto.preco) };
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
function obterDescontoCategoria(nomeCategoria) {
    const categorias = [{ nome: 'Alimentação', desconto: 30 }, { nome: 'Infantil', desconto: 15 }];
    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].nome === nomeCategoria) {
            return categorias[i].desconto;
        }
    }
    return 0;
}

// Crie uma função que recebe uma lista de produtos e um valor máximo de orçamento
// e retorna uma lista com os produtos com preços menores ou iguais ao valor do orçamento informado
function obterProdutosLimitadosAoOrcamento(produtos, precoMaximo) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    }

    return produtos.filter(p => p.preco <= precoMaximo);
}

// Crie uma função que recebe uma lista de produtos de uma compra,
// onde cada produto tem também o seu preço e quantidade e retorna o valor total da compra
function calcularTotalDaCompra(produtos) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    }

    return produtos.reduce((subtotal, produto) =>
        subtotal + (produto.quantidade * produto.preco), 0);
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista produtos e retorna um objeto com duas propriedades: menorPreco e maiorPreco.
// estas propriedades devem conter como valor o produto mais barato e o produto mais caro, respectivamente
function obterMenorEMaiorPrecos(produtos) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    }

    return {
        menorPreco: obterMenorPreco(produtos),
        maiorPreco: obterMaiorPreco(produtos)
    }
}

// Crie uma função que recebe uma lista de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de produtos dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
function obterProdutosDentroDoOrcamento(produtos, menorValor, maiorValor) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    }

    if (menorValor > maiorValor) {
        return undefined;
    }

    return produtos.filter(p => (p.preco >= menorValor) && (p.preco <= maiorValor));
}

// Crie uma função que recebe uma categoria e um cupom e aplica um acréscimo de 10% no desconto da categoria, se o cupom for válido
// Utilize a função obterDescontoCategoria criada anteriormente
function cupomEhValido(cupom) {
    const cuponsValidos = ['NULABSSA', 'ALURANU'];
    return cuponsValidos.indexOf(cupom.texto) !== -1 && cupom.desconto > 0;
}

function obterDescontoTotal(categoria, cupom) {
    const descontoCategoria = obterDescontoCategoria(categoria);
    if (cupomEhValido(cupom)) {
        return descontoCategoria + cupom.desconto;
    } else {
        return descontoCategoria;
    }
}

// Crie uma função que recebe uma lista de produtos, uma lista de categorias de produtos e um cupom.
// A função deve retornar o valor total da compra, considerando os descontos de cada categoria e o cupom informado
function calcularTotalDaCompraComDescontos(produtos, cupom) {
    if (listaEhInvalida(produtos)) {
        return undefined;
    }

    return produtos.reduce((subtotal, produto) => {
        const descontoTotal = obterDescontoTotal(produto.categoria, cupom);
        return subtotal + (produto.preco * produto.quantidade) - (produto.preco * descontoTotal / 100);
    }, 0);
}

// =======
// Desafio
// =======

// Crie uma classe chamada CarrinhoDeCompras
// O carrinho deve ter as seguintes funcionalidades:
// - incluirProduto
// - listarProdutos
class CarrinhoDeCompras {
    constructor() {
        this.produtos = [];
        this.cupom = null;
    }

    incluirProduto(produto) {
        this.produtos.push(produto);
    }

    excluirProduto(indice) {
        this.produtos = this.produtos.filter((prod, i) => indice !== i);
    }

    listarProdutos() {
        return [...this.produtos];
    }

    definirCupomDesconto(cupom) {
        this.cupom = { ...cupom };
    }

    obterCupomDesconto() {
        return { ...this.cupom };
    }

    excluirCupomDesconto() {
        this.cupom = null;
    }

    subtotal() {
        return calcularTotalDaCompra(this.produtos);
    }

    total() {
        return calcularTotalDaCompraComDescontos(this.produtos, this.cupom);
    }
}

module.exports = {
    obterMenorPreco,
    obterMaiorPreco,
    incluirPrecoFormatado,
    obterDescontoCategoria,
    obterProdutosLimitadosAoOrcamento,
    calcularTotalDaCompra,
    obterMenorEMaiorPrecos,
    obterProdutosDentroDoOrcamento,
    obterDescontoTotal,
    calcularTotalDaCompraComDescontos,
    CarrinhoDeCompras
};
