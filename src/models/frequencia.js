import Funcionario from "./funcionario";
import Setor from "./setor";
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
        this.funcionario = new Funcionario();
        this.setorOrigem = new Setor();
    }
    validations() {
        return {
            origem: {
                required,
            },
            ano: {
                required,
            },
            mes: {
                required,
            },
            enviada: {
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