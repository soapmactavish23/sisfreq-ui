import Funcionario from "./funcionario";
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
        //TODO: SETOR
        this.funcionario = new Funcionario();
        this.setorOrigem = new Setor();
    }

}