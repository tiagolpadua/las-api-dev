const { ordenar, planificar, menorMaior, clonar, descontoCategoria, calcularValores, separar, rejeitar, amostra, intersecao, planificarRecursivo, guardar } = require('./arrays');

describe('Essencial', () => {
    test('Deve ordenar um par de números.', () => {
        expect(ordenar([10, 7])).toEqual([7, 10]);
    });

    test('Deve planificar uma lista de números.', () => {
        expect(planificar([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('Deve encontrar o menor e o maior elemento.', () => {
        expect(menorMaior([10, 7, 8, 25, 8, 9, 100, 99])).toEqual([7, 100]);
    });
});

// describe('Desejável', () => {
// });

// describe('Desafio', () => {
// });
