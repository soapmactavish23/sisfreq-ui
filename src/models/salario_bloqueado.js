import Funcionario from "./funcionario";
import { required, maxLength } from "@vuelidate/validators";
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
                maxLength: maxLength(10),
            },
            mes: {
                required,
                maxLength: maxLength(10),
            },
            banco: {
                maxLength: maxLength(20),
            },
            agencia: {
                maxLength: maxLength(10),
            },
            conta: {
                maxLength: maxLength(10),
            },
            valorSalario: {
                maxLength: maxLength(10),
            },
            observacao: {
                maxLength: maxLength(100),
            },
            dataCadastro: {
                required,
            },
            dataModificacao: {
                required,
            },
            funcionario: {
                required,
            },
        };
    }
}