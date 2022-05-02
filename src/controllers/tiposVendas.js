const TiposVendas = require("../models/tiposVendas");

module.exports = (app) => {
  app.get("/tipos-vendas", (req, res, next) => {
    TiposVendas.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  // eslint-disable-next-line no-unused-vars
  app.get("/tipos-vendas/:id", (req, res, next) => {
    // TODO
  });

  // eslint-disable-next-line no-unused-vars
  app.post("/tipos-vendas", (req, res, next) => {
    // TODO
  });

  // eslint-disable-next-line no-unused-vars
  app.put("/tipos-vendas/:id", (req, res, next) => {
    // TODO
  });

  // eslint-disable-next-line no-unused-vars
  app.delete("/tipos-vendas/:id", (req, res, next) => {
    // TODO
  });
};
