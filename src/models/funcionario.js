export default class Funcionario {

    constructor() {
        this.id = null;
        this.lotacao = new Setor();
        this.atuacao = new Setor();
        this.cpf = null;
        this.matricula = null;
        this.vinculo = null;
        this.nome = null;
        this.horarioTrabalho = null;
        this.situacao = null;
        this.dataDesligamento = null;
        this.tipoAfastamento = null;
        this.dataInicioAfastamento = null;
        this.dataFimAfastamento = null;
        this.banco = null;
        this.agencia = null;
        this.conta = null;
        this.dataCadastro = null;
        this.dataModificacao = null;
    }

}