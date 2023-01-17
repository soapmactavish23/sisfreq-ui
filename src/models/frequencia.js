export default class Frequecia {

    constructor() {
        this.id = null;
        this.documento = null;
        this.observacao = null;
        this.ano = null;
        this.mes = null;
        this.enviada = null;
        this.horarioTrabalho = null;
        this.situacao = null;
        this.tipoAfastamento = null;
        this.dataInicioAfastamento = null;
        this.dataFimAfastamento = null;
        this.dataCadastro = null;
        //TODO: FUNCIONARIO E SETOR
        this.funcionario = new Funcionario();
        this.storOrigem = new Setor();
    }

}