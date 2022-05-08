const repositorio = require("../repositorios/evento");
const moment = require("moment");
const { isURLValida } = require("../infraestrutura/validacoes");

class Eventos {
  listar() {
    return repositorio.listar();
  }

  buscarPorId(id) {
    return repositorio.buscarPorId(id);
  }

  isDatasValidas(evento) {
    let datasSaoValidas = false;

    if (evento.dataInicio && evento.dataFim) {
      const dataInicio = moment(evento.dataInicio);
      const dataFim = moment(evento.dataFim);
      const hoje = moment();

      if (
        // Data de início e data de fim devem ser informadas
        evento.dataInicio &&
        evento.dataFim &&
        // Data de início é superior a data atual
        dataInicio.isAfter(hoje) &&
        // Data fim é após a data de início
        dataFim.isAfter(dataInicio)
      ) {
        datasSaoValidas = true;
      }
    }
    return datasSaoValidas;
  }

  async adicionar(evento) {
    const nomeEhValido = evento.nome.length >= 5;
    const descricaoEhValido = evento.descricao.length >= 5;
    const urlFotoEhValida = isURLValida(evento.urlFoto);
    const datasSaoValidas = this.isDatasValidas(evento);

    const validacoes = [
      {
        nome: "nome",
        valido: nomeEhValido,
        mensagem: "Nome deve ser informado e ter mais de 5 caracteres",
      },
      {
        nome: "descricao",
        valido: descricaoEhValido,
        mensagem: "Descrição deve ser informada e ter mais de 5 caracteres",
      },
      {
        nome: "urlFoto",
        valido: urlFotoEhValida,
        mensagem: "URL da foto do evento deve ser uma URL válida",
      },
      {
        nome: "datas",
        valido: datasSaoValidas,
        mensagem:
          "Datas devem ser informadas no formato YYYY-mm-dd, data de inicio deve ser superior a data atuao, data de fim deve ser superior a data de início",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length > 0;

    if (existemErros) {
      throw erros;
    } else {
      const resp = await repositorio.adicionar(evento);
      return { id: resp.insertId, ...evento };
    }
  }

  alterar(id, valores) {
    return repositorio.alterar(id, valores);
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  listarPorStatus(status) {
    switch (status) {
      case "agendado":
        return repositorio.listarEventosAgendados();
      case "em-andamento":
        return repositorio.listarEventosEmAndamento();
      case "finalizado":
        return repositorio.listarEventosFinalizados();
      default:
        throw new Error(`Status inválido: ${status}`);
    }
  }
}

module.exports = new Eventos();
