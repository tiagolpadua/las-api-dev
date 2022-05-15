const Usuarios = require("../models/usuarios");

module.exports = (app) => {
  // http://localhost:3000/usuarios
  app.get("/usuarios", (req, res, next) => {
    Usuarios.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => next(erros));
  });

  // http://localhost:3000/usuarios/1
  app.get("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarPorId(id)
      .then((usuario) => (usuario ? res.json(usuario) : res.status(404).send()))
      .catch((erros) => next(erros));
  });

  app.post("/usuarios", (req, res, next) => {
    const usuarios = req.body;
    Usuarios.adicionar(usuarios)
      .then((usuarioAdicionado) => res.status(201).json(usuarioAdicionado))
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterar(id, valores)
      .then(() => res.json(valores))
      .catch((erros) => next(erros));
  });

  app.delete("/usuarios/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.excluir(id)
      .then(() => res.status(204).send())
      .catch((erros) => next(erros));
  });

  // http://localhost:3000/usuarios/nome/tiago
  app.get("/usuarios/nome/:nome", (req, res, next) => {
    const nome = req.params.nome;
    Usuarios.buscarPorNome(nome)
      .then((resultado) => res.json(resultado))
      .catch((erros) => next(erros));
  });

  // Dados Pessoais
  // http://localhost:3000/usuarios/1/dados-pessoais
  app.get("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarDadosPessoaisPorId(id)
      .then((resultados) =>
        resultados ? res.json(resultados) : res.status(404).send()
      )
      .catch((erros) => next(erros));
  });

  app.put("/usuarios/:id/dados-pessoais", (req, res, next) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Usuarios.alterarDadosPessoais(id, valores)
      .then(() => res.json(valores))
      .catch((erros) => next(erros));
  });
};
