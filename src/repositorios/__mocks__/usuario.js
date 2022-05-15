const usuariosMock = require("./usuarios");

function getDadosBasicosUsuario({ id, nome, urlFotoPerfil }) {
  return { id, nome, urlFotoPerfil };
}

function getDadosPessoaisUsuario({ nomeCompleto, dataNascimento, rg, cpf }) {
  return { nomeCompleto, dataNascimento, rg, cpf };
}

class Usuario {
  listar() {
    return Promise.resolve(usuariosMock.map(getDadosBasicosUsuario));
  }

  buscarPorId(id) {
    const usuario = usuariosMock.find((usuario) => usuario.id === id);

    if (usuario) {
      return Promise.resolve(getDadosBasicosUsuario(usuario));
    } else {
      return Promise.resolve();
    }
  }

  buscarDadosPessoaisPorId(id) {
    const usuario = usuariosMock.find((usuario) => usuario.id === id);

    if (usuario) {
      return Promise.resolve(getDadosPessoaisUsuario(usuario));
    } else {
      return Promise.resolve();
    }
  }

  adicionar(usuario) {
    return Promise.resolve(usuario && { insertId: 99 });
  }

  buscarPorNomeExato(nome) {
    const usuario = usuariosMock.find((usuario) => usuario.nome === nome);
    if (usuario) {
      return Promise.resolve(getDadosBasicosUsuario(usuario));
    } else {
      return Promise.resolve();
    }
  }

  //   alterar(id, valores) {
  //     const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //     return query(sql, [valores, id]);
  //   }

  //   excluir(id) {
  //     const sql = "DELETE FROM Usuarios WHERE id = ?";
  //     return query(sql, id);
  //   }

  //   buscarPorNome(nome) {
  //     const sql =
  //       "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome like ?";
  //     return query(sql, "%" + nome + "%");
  //   }

  //   atualizarDadosPessoais(id, dadosPessoais) {
  //     const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //     return query(sql, [dadosPessoais, id]);
  //   }

  //   obterDadosPessoais(id) {
  //     const sql =
  //       "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
  //     return query(sql, id);
  //   }

  //   atualizarContatos(id, dadosPessoais) {
  //     const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //     return query(sql, [dadosPessoais, id]);
  //   }

  //   obterContatos(id) {
  //     const sql =
  //       "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
  //     return query(sql, id);
  //   }

  //   atualizarSenha(id, dadosPessoais) {
  //     const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //     return query(sql, [dadosPessoais, id]);
  //   }

  //   atualizarEndereco(id, dadosPessoais) {
  //     const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //     return query(sql, [dadosPessoais, id]);
  //   }

  //   obterEndereco(id) {
  //     const sql =
  //       "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
  //     return query(sql, id);
  //   }
}

module.exports = new Usuario();
