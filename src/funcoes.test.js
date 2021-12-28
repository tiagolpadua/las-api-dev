const { saudar, extrairPrimeiroNome, capitalizar, truncar } = require('./funcoes');

test('Deve saudar um usuário.', () => {
    expect(saudar("Tiago")).toBe("Olá, Tiago");
});

test('Deve extrair o primeiro nome.', () => {
    expect(extrairPrimeiroNome("Tiago Lage Payne de Pádua")).toBe("Tiago");
});

test('Deve capitalizar uma palavra.', () => {
    expect(capitalizar("mArIa")).toBe("Maria");
});

test('Deve truncar uma palavra maior que o comprimento máximo.', () => {
    expect(truncar("Fulano", 4)).toBe("Fula...");
});

test('O comprimento padrão do truncamento deve ser 5.', () => {
    expect(truncar("Fulano")).toBe("Fulan...");
});

test('Não deve truncar palavras menores que o comprimento máximo.', () => {
    expect(truncar("Fulano", 20)).toBe("Fulano");
});