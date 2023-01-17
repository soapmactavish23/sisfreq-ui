import Funcionario from "./funcionario";

export default class SalarioBloqueado {

    constructor() {
        this.id = null;
        this.ano = null;
        this.mes = null;
        this.banco = null;
        this.agencia = null;
        this.conta = null;
        this.valorSalario = null;
        this.observacao = null;
        this.dataCadastro = null;
        this.dataModificacao = null;
        this.funcionario = new Funcionario();

    }
    validations() {
        return {
            ano: {
                required,
            },
            mes: {
                required,
            },
            dataCadastro: {
                required,
            },
            dataModificacao: {
                required,
            },
            funcionario: {
                id: {
                    required,
                }
            },
        };
    }
}