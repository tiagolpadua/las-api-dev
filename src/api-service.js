const fetch = require("node-fetch");

const BASE_PATH = "https://stupefied-keller-a2c79e.netlify.app";

function tratarErro(erro) {
  throw new Error(erro.message);
}

function verificarResposta(res) {
  if (res.status >= 400) {
    tratarErro({ message: `${res.statusText}: ${res.status}` });
  }
}

async function doGet(path) {
  const response = await fetch(path);
  verificarResposta(response);
  const data = await response.json();
  return data;
}

async function listarProdutos() {
  return await doGet(BASE_PATH + "/produtos.json");
}

async function listarCategorias() {
  return await doGet(BASE_PATH + "/categorias.json");
}

async function listarCuponsValidos() {
  return await doGet(BASE_PATH + "/cupons.json");
}

module.exports = {
  tratarErro,
  verificarResposta,
  listarProdutos,
  listarCategorias,
  listarCuponsValidos,
};
