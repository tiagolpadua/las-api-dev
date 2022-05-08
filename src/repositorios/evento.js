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

  adicionar(evento) {
    const sql = "INSERT INTO Eventos SET ?";
    return query(sql, evento);
  }

  alterar(id, valores) {
    const sql = "UPDATE Eventos SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }

  excluir(id) {
    const sql = "DELETE FROM Eventos WHERE id = ?";
    return query(sql, id);
  }

  listarEventosAgendados() {
    const sql = "SELECT * FROM Eventos WHERE dataInicio >= CURDATE();";
    return query(sql);
  }

  listarEventosEmAndamento() {
    const sql =
      "SELECT * FROM Eventos WHERE dataInicio <= CURDATE() and dataFim >= CURDATE()";
    return query(sql);
  }

  listarEventosFinalizados() {
    const sql = "SELECT * FROM Eventos WHERE dataFim < CURDATE()";
    return query(sql);
  }
}

module.exports = new Evento();
