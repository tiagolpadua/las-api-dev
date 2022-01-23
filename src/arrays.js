const { capitalizar } = require('./funcoes');

// Observação: Para todas funções que recebem listas, se o parâmetro não for uma lista ou se a lista for vazia, retorne undefined.

// =========
// Essencial
// =========

function listaEhInvalida(lista) {
    return !Array.isArray(lista) || lista.length === 0;
}

// Crie uma função que recebe uma lista de preços e devolve o menor preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 7
function obterMenorPreco(lista) {
    if (listaEhInvalida(lista)) {
        return undefined;
    }

    let menor = lista[0];
    for (let i = 1; i < lista.length; i++) {
        if (menor > lista[i]) {
            menor = lista[i];
        }
    }
    return menor;
}

// Crie uma função que recebe uma lista de preços e devolve o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => 100
function obterMaiorPreco(lista) {
    if (listaEhInvalida(lista)) {
        return undefined;
    }

    let maior = lista[0];
    for (let i = 1; i < lista.length; i++) {
        if (maior < lista[i]) {
            maior = lista[i];
        }
    }
    return maior;
}

// Crie uma função que receba uma lista de nomes e devolve a lista de nomes capitalizados
// (["tiago", "Alexandre", "kamillA"]) => ["Tiago", "Alexandre", "Kamilla"]
function capitalizarNomes(nomes) {
    if (listaEhInvalida(nomes)) {
        return undefined;
    }

    return nomes.map(capitalizar);
}

// Crie uma função que recebe o nome de uma categoria e devolve o desconto associado a esta categoria,
// ou 0 se não houver desconto.
// Utilize as listas que já estão na função para implementar seu código.
// ('Alimentação') => 30
// ('Infantil') => 15
function obterDescontoCategoria(categoria) {
    const categorias = ['Alimentação', 'Infantil'];
    const descontos = [30, 15]
    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i] === categoria) {
            return descontos[i];
        }
    }
    return 0;
}

// Crie uma função que recebe uma lista de preços de produtos e um valor máximo de orçamento
// e retorna uma lista com os preços menores ou iguais ao valor do orçamento informado
// ([5, 7, 9, 50, 20], 9) => [5, 7, 9]
function obterPrecosLimitadosAoOrcamento(lista, precoMaximo) {
    if (listaEhInvalida(lista)) {
        return undefined;
    }

    return lista.filter(p => p <= precoMaximo);
}

// Crie uma função que recebe uma lista de preços de produtos de uma compra
// e retorna o valor total da compra
// [10, 30, 5, 15] => 60
function calcularTotalDaCompra(lista) {
    if (listaEhInvalida(lista)) {
        return undefined;
    }

    return lista.reduce((acum, preco) => preco + acum, 0);
}

// =========
// Desejável
// =========

// Crie uma função que recebe uma lista de preços de produtos e retorna uma lista com o menor e o maior preço
// ([10, 7, 8, 25, 8, 9, 100, 99]) => [7, 100]
function obterMenorEMaiorPrecos(lista) {
    if (listaEhInvalida(lista)) {
        return undefined;
    }

    return [
        obterMenorPreco(lista),
        obterMaiorPreco(lista)
    ]
}

// Crie uma função que recebe uma lista de preços de produtos, um valor inferior e um valor superior de orçamento.
// Retorne uma lista de preços dentro do orçamento.
// Valide se o orçamento está correto, ou seja, se o menor valor é igual ou inferior ao maior valor, caso contrário, retorne undefined.
// ([10, 7, 8, 25, 8, 9, 100, 99], 9, 30) => [10, 25, 9]
function obterPrecosDentroDoOrcamento(lista, menorValor, maiorValor) {
    if (listaEhInvalida(lista)) {
        return undefined;
    }

    if (menorValor > maiorValor) {
        return undefined;
    }

    return lista.filter(p => (p >= menorValor) && (p <= maiorValor));
}

// Crie uma função que recebe uma categoria e um cupom e aplica um acréscimo de 10% no desconto da categoria, se o cupom for válido
// Utilize a função obterDescontoCategoria
// ('Alimentação', 'NULABSSA') => 40
// ('Alimentação', 'ALURANU') => 40
// ('Infantil', 'ALURANU') => 25
// ('Bebida', 'ALURANU') => 10
// ('Bebida', 'CUPOM-INVALIDO') => 0
// ('Alimentação', 'CUPOM-INVALIDO') => 30
// Utilize a função descontoCategoria criada anteriormente
function cupomEhValido(cupom) {
    const cuponsValidos = ['NULABSSA', 'ALURANU'];
    return cuponsValidos.indexOf(cupom) !== -1;
}

function obterDescontoTotal(categoria, cupom) {
    const descontoCategoria = obterDescontoCategoria(categoria);
    if (cupomEhValido(cupom)) {
        return descontoCategoria + 10;
    } else {
        return descontoCategoria;
    }
}

// Crie uma função que recebe uma lista de preços e uma lista de categorias de produtos e
// devolve o valor total da compra, considerando os descontos de cada categoria e o cupom informado
// ([50, 25, 30, 22], ['Infantil', 'Bebida', 'Alimentação', 'Bebida'], 'ALURANU') => 97.80
// Utilize a função obterDescontoTotal criada anteriormente
function calcularTotalDaCompraComDescontos(precos, categorias, cupom) {
    if (listaEhInvalida(precos) || listaEhInvalida(categorias)) {
        return undefined;
    }

    return precos.reduce((acum, preco, index) => {
        const descontoTotal = obterDescontoTotal(categorias[index], cupom);
        return acum + preco - (preco * descontoTotal / 100);
    }, 0);
}

// Crie uma função que receba um nome completo e o retorna com todas as partes capitalizadas.
// Desconsidere palavras com menos de 3 letras
// ("tiago lage payne de pádua") => "Tiago Lage Payne de Pádua"
function capitalizarNomeCompleto(nomeCompleto) {
    return nomeCompleto
        .split(" ")
        .map(p => p.length >= 3 ? capitalizar(p) : p)
        .reduce((acum, p) => acum ? acum + " " + p : p, "");
}

// =======
// Desafio
// =======

// Crie uma função que recebe uma lista de preços e categorias e devolve um cupom fiscal conforme abaixo:
// (['Serpentina', 'Refrigerante'], [20, 7], ['Infantil', 'Bebida'], 'NULABSSA') => 
// Nome           Valor     Desconto  Imposto Total     
// Serpentina     R$  20,00 R$   5,00     15% R$  18,00 
// Refrigerante   R$   7,00 R$   0,70         R$   6,30 
// Subtotal                                   R$  24,30 
// Cupom de Desconto: NULABSSA                R$   3,00 
// Total                                      R$  21,30

function leftpad(p, n) {
    let ret = p;
    while (p.length < n) {
        p = " " + p;
    }
    return p;
}

function rightpad(p, n) {
    let ret = p;
    while (p.length < n) {
        p = p + " ";
    }
    return p;
}

function formataValor(valor) {
    return 'R$ ' + leftpad((Math.round(valor * 100) / 100).toFixed(2).split('.').join(','), 6);
}

function gerarCupomFiscal(listaNomesProdutos, listaPrecosProdutos, listaCategoriasProdutos, cupom) {
    if (listaEhInvalida(listaNomesProdutos) || listaEhInvalida(listaPrecosProdutos) || listaEhInvalida(listaCategoriasProdutos)) {
        return undefined;
    }

    const categoriasIsentas = ['Infantil', 'Alimentação'];
    const imposto = 15;

    const cols = [15, 10, 10, 8, 10];
    const cabecalho = rightpad('Nome', cols[0]) +
        rightpad('Valor', cols[1]) +
        rightpad('Desconto', cols[2]) +
        rightpad('Imposto', cols[3]) +
        rightpad('Total', cols[4]) + '\n';

    let subTotal = 0;
    const corpo = listaNomesProdutos.map((p, idx) => {

        let impostoCalculado = 0;

        if (categoriasIsentas.indexOf(listaCategoriasProdutos[idx]) === -1) {
            impostoCalculado = listaPrecosProdutos[idx] * (imposto / 100);
        }

        let descontoCalculado = listaPrecosProdutos[idx] * (obterDescontoCategoria(listaCategoriasProdutos[idx]) / 100);

        let valor = listaPrecosProdutos[idx] - descontoCalculado + impostoCalculado;

        subTotal += valor;

        return rightpad(p, cols[0]) +
            formataValor(listaPrecosProdutos[idx]) + ' ' +
            formataValor(descontoCalculado) +
            leftpad(impostoCalculado > 0 ? imposto + '%' : '', cols[3]) + ' ' +
            formataValor(valor) + ' '
    }).join('\n');

    let descontoCupom = cupomEhValido(cupom) ? subTotal * 0.1 : 0;

    descontoCupom = Number.parseFloat(descontoCupom.toFixed(2));

    let linhaDescontoCupom = '';

    if (descontoCupom > 0) {
        linhaDescontoCupom = `Cupom de Desconto: ${rightpad(cupom, 23)} ${formataValor(descontoCupom)} \n`;
    }

    const total = subTotal - descontoCupom;

    const rodape = 'Subtotal' + leftpad(formataValor(subTotal), 44) + ' \n' +
        linhaDescontoCupom +
        `${rightpad('Total', 42)} ${formataValor(total)}`;

    return cabecalho + corpo + '\n' + rodape;
}

module.exports = {
    obterMenorPreco,
    obterMaiorPreco,
    capitalizarNomes,
    obterDescontoCategoria,
    obterPrecosLimitadosAoOrcamento,
    calcularTotalDaCompra,
    obterMenorEMaiorPrecos,
    obterPrecosDentroDoOrcamento,
    obterDescontoTotal,
    calcularTotalDaCompraComDescontos,
    capitalizarNomeCompleto,
    gerarCupomFiscal
};
