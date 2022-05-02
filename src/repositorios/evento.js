const query = require("../infraestrutura/database/queries");

class Evento {
  listar() {
    const sql = "SELECT * FROM Eventos";
    return query(sql);
  }

  buscarPorId(id) {
    const sql = "SELECT * FROM Eventos WHERE id = ?";
    return query(sql, id);
  }

  // adicionar(usuario) {
  //   const sql = "INSERT INTO Usuarios SET ?";
  //   return query(sql, usuario);
  // }

  // alterar(id, valores) {
  //   const sql = "UPDATE Usuarios SET ? WHERE id = ?";
  //   return query(sql, [valores, id]);
  // }

  // excluir(id) {
  //   const sql = "DELETE FROM Usuarios WHERE id = ?";
  //   return query(sql, id);
  // }

  // buscarPorNome(nome) {
  //   const sql = "SELECT * FROM Usuarios WHERE nome like ?";
  //   return query(sql, "%" + nome + "%");
  // }
}

module.exports = new Evento();
