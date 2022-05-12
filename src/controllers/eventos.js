const Eventos = require("../models/eventos");

module.exports = (app) => {
  app.get("/eventos", (req, res, next) => {
    Eventos.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  app.get("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Eventos.buscarPorId(id)
      .then((resultado) => res.json(resultado))
      .catch((erros) => next(erros));
  });

  app.post("/eventos", (req, res, next) => {
    const evento = req.body;
    Eventos.adicionar(evento)
      .then((resultado) => res.json(resultado))
      .catch((erros) => next(erros));
  });

  app.put("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Eventos.alterar(id, valores)
      .then(() => res.json(valores))
      .catch((erros) => next(erros));
  });

  app.delete("/eventos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Eventos.excluir(id)
      .then(() => res.status(204).send())
      .catch((erros) => next(erros));
  });

  app.get("/eventos/status/:status", (req, res, next) => {
    Eventos.listarPorStatus(req.params.status)
      .then((resultado) => res.json(resultado))
      .catch((erros) => next(erros));
  });
};
