const { saudar, extrairPrimeiroNome, capitalizar, truncar, validaData, validaTextoPreenchido } = require('./funcoes');

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

test('Deve validar uma data correta.', () => {
    expect(validaData("01/03/2000")).toBeTruthy();
    expect(validaData("01/12/2000")).toBeTruthy();
    expect(validaData("30/12/2000")).toBeTruthy();
});

test('Deve validar se o texto está preenchido.', () => {
    expect(validaTextoPreenchido("")).toBeUndefined();
    expect(validaTextoPreenchido("    ")).toBeUndefined();
    expect(validaTextoPreenchido("    Maria ")).toBe("Maria");
});

test('Deve recusar datas inválidas.', () => {
    expect(validaData("99/03/2000")).toBeNaN();
    expect(validaData("teste123")).toBeNaN();
    expect(validaData("12/30/2000")).toBeNaN();
});