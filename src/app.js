const express = require("express");
const app = express();
const port = 3000;

const conexao = require("../infraestrutura/conexao");
const Tabelas = require("../infraestrutura/tabelas");

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Conectado com sucesso");

    Tabelas.init(conexao);

    app.get("/", (req, res) => {
      res.send("Olá Mundo!");
    });

    app.listen(port, () => {
      console.log(`LAS-API ouvindo na porta: ${port}`);
    });
  }
});
