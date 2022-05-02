const pool = require("./conexao");

const executaQuery = (sql, parametros = "") => {
  return new Promise((resolve, reject) => {
    pool.query(sql, parametros, (erros, resultados) => {
      if (erros) {
        reject(erros);
      } else {
        resolve(resultados);
      }
    });
  });
};

module.exports = executaQuery;
