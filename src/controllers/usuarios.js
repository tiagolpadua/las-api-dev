const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    Usuario.listar(res);
  });

  app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuario.buscarPorId(id, res);
  });

  app.get("/usuarios/nome/:nome", (req, res) => {
    Usuario.buscarPorNome(req.params.nome, res);
  });

  app.post("/usuarios", async (req, res) => {
    const usuario = req.body;
    await Usuario.adicionar(usuario, res);
  });

  app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    Usuario.alterar(id, valores, res);
  });

  app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Usuario.excluir(id, res);
  });
};
