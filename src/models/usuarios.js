const conexao = require("../infraestrutura/conexao");
const http = require("http");
const https = require("https");

class Usuario {
  async validarURLFotoPerfil(url) {
    return new Promise((resolve) => {
      try {
        (url.startsWith("https") ? https : http)
          .request(url, { method: "HEAD" }, () => resolve(true))
          .on("error", () => resolve(false))
          .end();
      } catch (err) {
        resolve(false);
      }
    });
  }

  async validarNomeUsuarioNaoUtilizado(nome) {
    return new Promise((resolve) => {
      const sql = `SELECT * FROM Usuarios WHERE nome='${nome}'`;
      conexao.query(sql, (erro, resultados) => {
        if (erro) {
          resolve(false);
        } else {
          if (resultados.length > 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      });
    });
  }

  async adicionar(usuario, res) {
    const nomeEhValido =
      usuario.nome.length > 0 &&
      (await this.validarNomeUsuarioNaoUtilizado(usuario.nome));
    const urlEhValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);

    const validacoes = [
      {
        nome: "nome",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e deve ser único",
      },
      {
        nome: "urlFotoPerfil",
        valido: urlEhValida,
        mensagem: "URL deve uma URL válida",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const sql = "INSERT INTO Usuarios SET ?";

      conexao.query(sql, usuario, (erro) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(usuario);
        }
      });
    }
  }

  listar(res) {
    const sql = "SELECT * FROM Usuarios";
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscarPorId(id, res) {
    const sql = `SELECT * FROM Usuarios WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      const usuario = resultados[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        if (usuario) {
          res.status(200).json(usuario);
        } else {
          res.status(404).end();
        }
      }
    });
  }

  buscarPorNome(nome, res) {
    const sql = `SELECT * FROM Usuarios WHERE nome like %${nome}%`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        if (resultados.length > 0) {
          res.status(200).json(resultados);
        } else {
          res.status(404).end();
        }
      }
    });
  }

  alterar(id, valores, res) {
    const sql = "UPDATE Usuarios SET ? WHERE id=?";

    conexao.query(sql, [valores, id], (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  excluir(id, res) {
    const sql = "DELETE FROM Usuarios WHERE id=?";

    conexao.query(sql, id, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        if (resultado.affectedRows > 0) {
          res.status(200).json({ id });
        } else {
          res.status(404).end();
        }
      }
    });
  }
}

module.exports = new Usuario();
