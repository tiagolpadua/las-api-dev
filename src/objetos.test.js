const {
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
} = require('./objetos');

const produtos0 = [
    {
        nome: "Serpentina",
        categoria: "Infantil",
        preco: 30,
    },
    {
        nome: "Confete",
        categoria: "Infantil",
        preco: 10,
    },
    {
        nome: "Refrigerante",
        categoria: "Bebida",
        preco: 7
    },
    {
        nome: "Cerveja",
        categoria: "Bebida",
        preco: 8
    },
    {
        nome: "Sanduíche",
        categoria: "Alimentação",
        preco: 12
    },
]

const produtos1 = [
    {
        nome: "Confete",
        categoria: "Infantil",
        preco: 30
    },
    {
        nome: "Espuma",
        categoria: "Infantil",
        preco: 10
    },
    {
        nome: "Refrigerante",
        categoria: "Bebida",
        preco: 20
    },
    {
        nome: "Suco",
        categoria: "Bebida",
        preco: 6
    },
    {
        nome: "Laranja",
        categoria: "Alimentação",
        preco: 9
    },
]


describe('Essencial', () => {
    test('Deve obter o menor preço.', () => {
        expect(obterMenorPreco([])).toBeUndefined();

        expect(obterMenorPreco('foo')).toBeUndefined();

        expect(obterMenorPreco(produtos0)).toEqual({
            nome: "Refrigerante",
            categoria: "Bebida",
            preco: 7
        });

        expect(obterMenorPreco(produtos1)).toEqual({
            nome: "Suco",
            categoria: "Bebida",
            preco: 6
        });
    });

    test('Deve obter o maior preço.', () => {
        expect(obterMaiorPreco([])).toBeUndefined();

        expect(obterMaiorPreco('foo')).toBeUndefined();

        expect(obterMaiorPreco(produtos0)).toEqual({
            categoria: "Infantil",
            nome: "Serpentina",
            preco: 30
        });

        expect(obterMaiorPreco(produtos1)).toEqual({
            categoria: "Infantil",
            nome: "Confete",
            preco: 30
        });
    });

    test('Deve incluir os preços formatados.', () => {
        expect(incluirPrecoFormatado(produtos0[0])).toEqual({ ...produtos0[0], precoFormatado: "R$ 30,00" });
        expect(incluirPrecoFormatado(produtos1[2])).toEqual({ ...produtos1[2], precoFormatado: "R$ 20,00" });
    });

    test('Deve retornar o desconto da categoria.', () => {
        expect(obterDescontoCategoria('Alimentação')).toEqual(30);

        expect(obterDescontoCategoria('Infantil')).toEqual(15);

        expect(obterDescontoCategoria('Foo')).toEqual(0);
    });

    test('Deve retornar os produtos limitados ao orçamento.', () => {
        expect(obterProdutosLimitadosAoOrcamento([], 1)).toBeUndefined();

        expect(obterProdutosLimitadosAoOrcamento('foo', 1)).toBeUndefined();

        expect(obterProdutosLimitadosAoOrcamento(produtos0, 9)).toEqual([
            {
                nome: "Refrigerante",
                categoria: "Bebida",
                preco: 7
            },
            {
                nome: "Cerveja",
                categoria: "Bebida",
                preco: 8
            }]
        );

        expect(obterProdutosLimitadosAoOrcamento(produtos1, 10)).toEqual([
            {
                nome: "Espuma",
                categoria: "Infantil",
                preco: 10
            },
            {
                nome: "Suco",
                categoria: "Bebida",
                preco: 6
            },
            {
                nome: "Laranja",
                categoria: "Alimentação",
                preco: 9
            }
        ]);
    });

    test('Deve calcular o valor total da compra.', () => {
        expect(calcularTotalDaCompra([])).toBeUndefined();

        expect(calcularTotalDaCompra('foo')).toBeUndefined();

        expect(calcularTotalDaCompra([
            {
                ...produtos0[0],
                quantidade: 2,
            },
            {
                ...produtos0[2],
                quantidade: 1,
            },
            {
                ...produtos0[4],
                quantidade: 3,
            },
        ])).toEqual(103);

        expect(calcularTotalDaCompra([
            {
                ...produtos1[0],
                quantidade: 1,
            },
            {
                ...produtos1[2],
                quantidade: 3,
            },
            {
                ...produtos1[4],
                quantidade: 2,
            },
        ])).toEqual(108);
    });
});

describe('Desejável', () => {
    test('Deve retornar os produtos com menor e o maior preços.', () => {
        expect(obterMenorEMaiorPrecos([])).toBeUndefined();

        expect(obterMenorEMaiorPrecos('foo')).toBeUndefined();

        expect(obterMenorEMaiorPrecos(produtos0)).toEqual(
            {
                maiorPreco:
                {
                    categoria: "Infantil",
                    nome: "Serpentina",
                    preco: 30
                },
                menorPreco:
                {
                    categoria: "Bebida",
                    nome: "Refrigerante",
                    preco: 7
                }
            });

        expect(obterMenorEMaiorPrecos(produtos1)).toEqual(
            {
                maiorPreco:
                {
                    categoria: "Infantil",
                    nome: "Confete",
                    preco: 30
                },
                menorPreco:
                {
                    categoria: "Bebida",
                    nome: "Suco",
                    preco: 6
                }
            });
    });

    test('Deve retornar os produtos dentro do orçamento.', () => {
        expect(obterProdutosDentroDoOrcamento([], 1, 1)).toBeUndefined();

        expect(obterProdutosDentroDoOrcamento('foo', 1, 1)).toBeUndefined();

        expect(obterProdutosDentroDoOrcamento([10, 7, 8, 25, 8, 9, 100, 99], 50, 30))
            .toBeUndefined();

        expect(obterProdutosDentroDoOrcamento(produtos0, 9, 30))
            .toEqual([
                {
                    categoria: "Infantil",
                    nome: "Serpentina",
                    preco: 30,
                },
                {
                    categoria: "Infantil",
                    nome: "Confete",
                    preco: 10,
                },
                {
                    categoria: "Alimentação",
                    nome: "Sanduíche",
                    preco: 12,
                },
            ]);

        expect(obterProdutosDentroDoOrcamento(produtos1, 20, 30))
            .toEqual([
                {
                    categoria: "Infantil",
                    nome: "Confete",
                    preco: 30,
                },
                {
                    categoria: "Bebida",
                    nome: "Refrigerante",
                    preco: 20,
                }
            ]);
    });

    test('Deve retornar o desconto total.', () => {
        expect(
            obterDescontoTotal('Alimentação', { texto: 'NULABSSA', desconto: 10 }))
            .toEqual(40);

        expect(
            obterDescontoTotal('Alimentação', { texto: 'ALURANU', desconto: 15 }))
            .toEqual(45);

        expect(
            obterDescontoTotal('Infantil', { texto: 'ALURANU', desconto: 15 }))
            .toEqual(30);

        expect(
            obterDescontoTotal('Bebida', { texto: 'ALURANU', desconto: 15 }))
            .toEqual(15);

        expect(
            obterDescontoTotal('Alimentação', { texto: 'ALURANU', desconto: -99 }))
            .toEqual(30);

        expect(
            obterDescontoTotal('Bebida', { texto: 'CUPOM-INVALIDO', desconto: 15 }))
            .toEqual(0);

        expect(
            obterDescontoTotal('Alimentação', { texto: 'CUPOM-INVALIDO', desconto: 15 }))
            .toEqual(30);

        expect(
            obterDescontoTotal('KKK', { texto: 'CUPOM-INVALIDO', desconto: 15 }))
            .toEqual(0);
    });

    test('Deve calcular o total da compra com descontos.', () => {
        expect(calcularTotalDaCompraComDescontos([], 1, 'foo')).toBeUndefined();

        expect(calcularTotalDaCompraComDescontos('foo', [], 'foo')).toBeUndefined();

        expect(calcularTotalDaCompraComDescontos([
            {
                ...produtos0[0],
                quantidade: 2,
            },
            {
                ...produtos0[2],
                quantidade: 1,
            },
            {
                ...produtos0[4],
                quantidade: 3,
            }
        ], { texto: 'ALURANU', desconto: 15 }))
            .toEqual(87.55);

        expect(calcularTotalDaCompraComDescontos([
            {
                ...produtos1[0],
                quantidade: 1,
            },
            {
                ...produtos1[2],
                quantidade: 3,
            },
            {
                ...produtos1[4],
                quantidade: 2,
            }
        ], { texto: 'ALURANU', desconto: 15 }))
            .toEqual(91.95);


    });
});

describe('Desafio', () => {
    test('Deve gerar o cupom fiscal.', () => {
        const carrinhoDeCompras0 = new CarrinhoDeCompras();
        expect(carrinhoDeCompras0.listaProdutos.length).toBe(0);
    });
});
