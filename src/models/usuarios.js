const { isURLValida } = require("../infraestrutura/validacoes");
const repositorio = require("../repositorios/usuario");

class Usuarios {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  buscarDadosPessoaisPorId(id) {
    return repositorio.buscarDadosPessoaisPorId(id);
  }

  alterarDadosPessoais(id, { nomeCompleto, dataNascimento, rg, cpf }) {
    const dadosPessoais = { nomeCompleto, dataNascimento, rg, cpf };
    // demais validações
    return repositorio.alterar(id, dadosPessoais);
  }

  async adicionar({ nome, urlFotoPerfil }) {
    const usuario = { nome, urlFotoPerfil };

    let nomeEhValido = false;

    if (usuario?.nome?.length > 0) {
      const jaUtilizado = await this.isNomeUsuarioUtilizado(usuario.nome);
      if (!jaUtilizado) {
        nomeEhValido = true;
      }
    }

    const urlEhValida = await isURLValida(usuario?.urlFotoPerfil);

    const validacoes = [
      {
        nome: "nome",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "urlFotoPerfil",
        valido: urlEhValida,
        mensagem: "URL deve uma URL válida",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length > 0;

    if (existemErros) {
      throw { erroApp: erros };
    } else {
      const resp = await repositorio.adicionar(usuario);
      return { id: resp.insertId, ...usuario };
    }
  }

  alterar(id, { nome, urlFotoPerfil }) {
    const dadosBasicos = { nome, urlFotoPerfil };
    return repositorio.alterar(id, dadosBasicos);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  buscarPorNome(nome) {
    return repositorio.buscarPorNome(nome);
  }

  async isNomeUsuarioUtilizado(nome) {
    return repositorio.buscarPorNomeExato(nome).then((usuario) => !!usuario);
  }
}

module.exports = new Usuarios();
