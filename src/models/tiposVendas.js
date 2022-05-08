const repositorio = require("../repositorios/tipoVenda");

class TiposVendas {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  async adicionar(tipoVenda) {
    const resp = await repositorio.adicionar(tipoVenda);
    return { id: resp.insertId, ...tipoVenda };
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }
}

module.exports = new TiposVendas();
