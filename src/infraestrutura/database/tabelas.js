class Tabelas {
  init(pool) {
    this.pool = pool;

    // this.criarUsuarios();
    // this.criarEventos();
    // this.criarTiposVendas();
  }

  // insert into Usuarios (nome, urlFotoPerfil) values ('Tiago', 'https://randomuser.me/api/portraits/women/73.jpg');
  criarUsuarios() {
    const sql = `CREATE TABLE IF NOT EXISTS Usuarios(
        id INT AUTO_INCREMENT NOT NULL,
        nome varchar(100) NOT NULL,
        urlFotoPerfil text,
        
        -- dados pessoais
        nomeCompleto varchar(100),
        dataNascimento date,
        rg varchar(20),
        cpf varchar(11),

        -- contatos
        telefone varchar(11),
        celular varchar(11),
        email varchar(50),

        -- senha
        senha varchar(10),

        -- endereco
        cep varchar(8),
        endereco varchar(100),
        numero int,
        complemento varchar(100),
        bairro varchar(100),

        -- restrições
        UNIQUE (nome),
        PRIMARY KEY(id))`;

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Usuarios criada com sucesso");
      }
    });
  }

  // insert into Eventos values (1, 'Carnapiri', 'carnaval de pirenópolis', 'https://randomuser.me/api/portraits/women/73.jpg', '2022-05-01', '2022-05-15');
  criarEventos() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Eventos(id INT AUTO_INCREMENT NOT NULL, nome varchar(100) NOT NULL, descricao varchar(200) NOT NULL, urlFoto text, dataInicio date NOT NULL, dataFim date NOT NULL, PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Eventos criada com sucesso");
      }
    });
  }

  // insert into TiposVendas values (1, 'Bebidas');
  // insert into TiposVendas values (2, 'Alimentação');
  // insert into TiposVendas values (3, 'Abadás / Ingressos');
  criarTiposVendas() {
    const sql =
      "CREATE TABLE IF NOT EXISTS TiposVendas(id INT AUTO_INCREMENT NOT NULL, descricao varchar(100) NOT NULL, PRIMARY KEY(id))";

    this.pool.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela TiposVendas criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
