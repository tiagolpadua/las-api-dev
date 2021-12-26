const soma = require('./soma');

test('adiciona 1 + 2 e deve resultar em 3', () => {
    expect(soma(1, 2)).toBe(3);
});