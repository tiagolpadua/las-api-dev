const query = require("../infraestrutura/database/queries");

class Usuario {
  listar() {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios ";
    return query(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  adicionar(usuario) {
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  alterar(id, valores) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  buscarPorNome(nome) {
    const sql =
      "SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome like ?";
    return query(sql, "%" + nome + "%");
  }

  atualizarDadosPessoais(id, dadosPessoais) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [dadosPessoais, id]);
  }

  obterDadosPessoais(id) {
    const sql =
      "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  atualizarContatos(id, dadosPessoais) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [dadosPessoais, id]);
  }

  obterContatos(id) {
    const sql =
      "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  atualizarSenha(id, dadosPessoais) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [dadosPessoais, id]);
  }

  atualizarEndereco(id, dadosPessoais) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [dadosPessoais, id]);
  }

  obterEndereco(id) {
    const sql =
      "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }
}

module.exports = new Usuario();
