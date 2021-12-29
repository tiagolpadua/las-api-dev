// Escreva uma função que receba um nome e retorne uma saudação para este nome: Tiago -> Olá, Tiago
// function saudar() { }
function saudar(usuario) {
    return `Olá, ${usuario}`;
}

// Escreva uma função que receba um nome completo e retorna apenas o primeiro nome: Tiago Lage Payne de Pádua -> Tiago
// function extrairPrimeiroNome() { }
function extrairPrimeiroNome(nomeCompleto) {
    return nomeCompleto.split(' ')[0];
}

// Escreva uma função que receba uma palavra e torna a primeira letra maiúscula e as outras minúsculas: tIaGo -> Tiago
// function capitalizar() { }
function capitalizar(palavra) {
    const minuscula = palavra.toLowerCase();
    return minuscula.charAt(0).toUpperCase() + minuscula.slice(1);
}

// Escreva uma função que receba uma palavra como primeiro argumento, um comprimento máximo como segundo argumento e trunca a palavra se ela for maior que o comprimento máximo.
// o valor default do comprimento máximo deve ser 5:
// (teste, 10) -> teste
// (fulano, 4) -> fula...
// function truncar() { }
function truncar(palavra, comprimento = 5) {
    if (palavra.length > comprimento) {
        return palavra.slice(0, comprimento) + '...';
    } else {
        return palavra;
    }
}

// Escreva uma função que valida se o texto informado está preenchido e retorna o texto sem espaços antes ou depois.
// "" -> undefined
// "   " -> undefined
// "      Maria " -> "Maria"
// function validaTextoPreenchido() { }

function validaTextoPreenchido(texto) {
    return (texto && texto.trim()) || undefined;
}

// Escreva uma função que valida se a string passada é uma data de nascimento válida, deve retornar um objeto Date sea data for válida ou NaN caso seja inválida.
// 01/01/2000 -> Ok
// 99/99/9999 -> NaN
// function validaData() { }

function validaData(dataComoTexto) {
    const partes = dataComoTexto.split('/');
    if (partes.length !== 3) {
        return NaN;
    }

    const dd = partes[0];
    const mm = partes[1];
    const aaaa = partes[2];

    return Date.parse(`${mm}/${dd}/${aaaa}`)
}

// Escreva uma função que recebe um preço original e uma categoria de produto e calcula o valor do imposto. Produtos da categoria Alimentação são isentos. Outros produtos tem um imposto de 10%.
// (30, Alimentação) => 0
// (10, Bebida) => 1
function calculaImposto(preco, categoria) {
    if (categoria.toLowerCase() === 'alimentação') {
        return 0;
    } else {
        return preco * 0.1;
    }
}

// Escreva uma função que recebe um preço original, uma categoria de produto e um cupom de desconto e calcula o preço com desconto. Se a categoria for Alimentação e o cupom for NULABSSA, deve ser feito um desconto de 50%. Caso contrário, não há nenhum desconto.
// (30, Alimentação, NULABSSA) => 15
// (10, Bebida, NULABSSA) => 10
// (30, Alimentação, XPTO) => 30
// (10, Bebida, XPTO) => 10
function calculaDesconto(preco, categoria, cupom) {
    if (categoria.toLowerCase() === 'alimentação' && cupom === 'NULABSSA') {
        return preco * 0.5;
    } else {
        return preco;
    }
}

module.exports = { saudar, extrairPrimeiroNome, capitalizar, truncar, validaTextoPreenchido, validaData, calculaImposto, calculaDesconto };