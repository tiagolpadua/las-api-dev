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
      .then((resultados) => res.json(resultados[0]))
      .catch((erros) => next(erros));
  });

  // eslint-disable-next-line no-unused-vars
  app.post("/eventos", (req, res, next) => {
    // TODO
  });

  // eslint-disable-next-line no-unused-vars
  app.put("/eventos/:id", (req, res, next) => {
    // TODO
  });

  // eslint-disable-next-line no-unused-vars
  app.delete("/eventos/:id", (req, res, next) => {
    // TODO
  });

  // eslint-disable-next-line no-unused-vars
  app.get("/eventos/status/:status", (req, res, next) => {
    // TODO
  });
};
