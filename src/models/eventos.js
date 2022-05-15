const repositorio = require("../repositorios/evento");
const moment = require("moment");
const { isURLValida } = require("../infraestrutura/validacoes");

const STATUS_AGENDADO = "agendado";
const STATUS_EM_ANDAMENTO = "em-andamento";
const STATUS_FINALIZADO = "finalizado";

class Eventos {
  async listar() {
    return this.insereStatusNosEventos(await repositorio.listar());
  }

  async buscarPorId(id) {
    const evento = await repositorio.buscarPorId(id);
    return this.insereStatusNoEvento(evento);
  }

  isDatasValidas(evento) {
    let datasSaoValidas = false;

    // Data de início e data de fim devem ser informadas
    if (evento.dataInicio && evento.dataFim) {
      const dataInicio = moment(evento.dataInicio);
      const dataFim = moment(evento.dataFim);
      const hoje = moment();

      if (
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

  async alterar(id, valores) {
    return this.insereStatusNoEvento(await repositorio.alterar(id, valores));
  }

  excluir(id) {
    return repositorio.excluir(id);
  }

  async listarPorStatus(status) {
    let eventos;

    switch (status) {
      case STATUS_AGENDADO:
        eventos = await repositorio.listarEventosAgendados();
        break;
      case STATUS_EM_ANDAMENTO:
        eventos = await repositorio.listarEventosEmAndamento();
        break;
      case STATUS_FINALIZADO:
        eventos = await repositorio.listarEventosFinalizados();
        break;
      default:
        throw new Error(`Status inválido: ${status}`);
    }

    return this.insereStatusNosEventos(eventos);
  }

  insereStatusNosEventos(eventos) {
    return eventos.map((evento) => this.insereStatusNoEvento(evento));
  }

  insereStatusNoEvento(evento) {
    if (evento) {
      evento = { ...evento, status: this.obterStatusEvento(evento) };
    }

    return evento;
  }

  obterStatusEvento(evento) {
    const dataInicio = moment(evento.dataInicio);
    const dataFim = moment(evento.dataFim);
    const hoje = moment();

    if (dataInicio.isAfter(hoje)) {
      return STATUS_AGENDADO;
    } else if (dataInicio.isSameOrBefore(hoje) && dataFim.isSameOrAfter(hoje)) {
      return STATUS_EM_ANDAMENTO;
    } else if (dataFim.isBefore(hoje)) {
      return STATUS_FINALIZADO;
    }

    return undefined;
  }
}

module.exports = new Eventos();
