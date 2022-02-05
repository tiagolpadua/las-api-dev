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

const serpentina = {
    nome: "Serpentina",
    categoria: "Infantil",
    preco: 30,
};

const confete = {
    nome: "Confete",
    categoria: "Infantil",
    preco: 10,
};

const refrigerante = {
    nome: "Refrigerante",
    categoria: "Bebida",
    preco: 7
};

const cerveja = {
    nome: "Cerveja",
    categoria: "Bebida",
    preco: 8
};

const sanduiche = {
    nome: "Sanduíche",
    categoria: "Alimentação",
    preco: 12
};

const produtos0 = [
    serpentina,
    confete,
    refrigerante,
    cerveja,
    sanduiche,
]

const espuma = {
    nome: "Espuma",
    categoria: "Infantil",
    preco: 10
};

const batida = {
    nome: "Batida",
    categoria: "Bebida",
    preco: 5
};

const suco = {
    nome: "Suco",
    categoria: "Bebida",
    preco: 6
};

const laranja = {
    nome: "Laranja",
    categoria: "Alimentação",
    preco: 9
};

const produtos1 = [
    confete,
    espuma,
    batida,
    suco,
    laranja,
]


describe('Essencial', () => {
    test('Deve obter o menor preço.', () => {
        expect(obterMenorPreco([])).toBeUndefined();

        expect(obterMenorPreco('foo')).toBeUndefined();

        expect(obterMenorPreco(produtos0)).toEqual(refrigerante);

        expect(obterMenorPreco(produtos1)).toEqual(batida);
    });

    test('Deve obter o maior preço.', () => {
        expect(obterMaiorPreco([])).toBeUndefined();

        expect(obterMaiorPreco('foo')).toBeUndefined();

        expect(obterMaiorPreco(produtos0)).toEqual(serpentina);

        expect(obterMaiorPreco(produtos1)).toEqual(confete);
    });

    test('Deve incluir os preços formatados.', () => {
        expect(incluirPrecoFormatado(produtos0[0])).toEqual({ ...produtos0[0], precoFormatado: "R$ 30,00" });
        expect(incluirPrecoFormatado(produtos1[2])).toEqual({ ...produtos1[2], precoFormatado: "R$ 5,00" });
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
            refrigerante,
            cerveja]
        );

        expect(obterProdutosLimitadosAoOrcamento(produtos1, 7)).toEqual([
            batida,
            suco
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
        ])).toEqual(43);
    });
});

describe('Desejável', () => {
    test('Deve retornar os produtos com menor e o maior preços.', () => {
        expect(obterMenorEMaiorPrecos([])).toBeUndefined();

        expect(obterMenorEMaiorPrecos('foo')).toBeUndefined();

        expect(obterMenorEMaiorPrecos(produtos0)).toEqual(
            {
                maiorPreco: serpentina,
                menorPreco: refrigerante
            });

        expect(obterMenorEMaiorPrecos(produtos1)).toEqual(
            {
                maiorPreco: confete,
                menorPreco: batida
            });
    });

    test('Deve retornar os produtos dentro do orçamento.', () => {
        expect(obterProdutosDentroDoOrcamento([], 1, 1)).toBeUndefined();

        expect(obterProdutosDentroDoOrcamento('foo', 1, 1)).toBeUndefined();

        expect(obterProdutosDentroDoOrcamento([10, 7, 8, 25, 8, 9, 100, 99], 50, 30))
            .toBeUndefined();

        expect(obterProdutosDentroDoOrcamento(produtos0, 9, 30))
            .toEqual([
                serpentina,
                confete,
                sanduiche,
            ]);

        expect(obterProdutosDentroDoOrcamento(produtos1, 1, 10))
            .toEqual([
                confete,
                espuma,
                batida,
                suco,
                laranja,
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
            .toEqual(35.2);


    });
});

describe('Desafio', () => {
    test('Deve criar o carrinho de compras.', () => {
        const carrinhoDeCompras = new CarrinhoDeCompras();
        expect(carrinhoDeCompras).toBeDefined();
        expect(carrinhoDeCompras.listarProdutos().length).toBe(0);
        expect(carrinhoDeCompras.obterCupomDesconto().length).toBeFalsy();
    });

    test('Deve incluir produto no carrinho.', () => {
        const carrinhoDeCompras = new CarrinhoDeCompras();
    });
});
