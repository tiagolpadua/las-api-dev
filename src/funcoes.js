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

module.exports = { saudar, extrairPrimeiroNome, capitalizar, truncar };