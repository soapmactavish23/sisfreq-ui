import Funcionario from "./funcionario";
import Setor from "./setor";
import { required, maxLength } from "@vuelidate/validators";
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
        this.dataModificacao = null;
        this.funcionario = new Funcionario();
        this.setorOrigem = new Setor();
    }
    validations() {
        return {
            documento: {

            },
            observacao: {

            },
            ano: {
                required,
                maxLength: maxLength(10),
            },
            mes: {
                required,
                maxLength: maxLength(10),
            },
            enviada: {

            },
            horarioTrabalho: {

            },
            situacao: {

            },
            tipoAfastamento: {

            },
            dataCadastro: {

            },
            dataModificacao: {

            },
            setorOrigem: {
                id: {
                    required,
                }
            },
            funcionario: {

            },
        };
    }
}