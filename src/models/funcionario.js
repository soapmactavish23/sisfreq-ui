import Setor from "./setor";
import { required, maxLength } from "@vuelidate/validators";
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
    validations() {
        return {
            lotacao: {
                required,
                maxLength: maxLength(10),
            },
            atuacao: {
                required,
                maxLength: maxLength(10),
            },
            cpf: {
                maxLength: maxLength(15),
            },
            matricula: {
                required,
                maxLength: maxLength(15),
            },
            vinculo: {
                required,
                maxLength: maxLength(10),
            },
            nome: {
                required,
                maxLength: maxLength(100),
            },
            horarioTrabalho: {
                maxLength: maxLength(25),
            },
            situacao: {
                required,
                maxLength: maxLength(20),
            },
            tipoAfastamento: {
                maxLength: maxLength(10),
            },
            dataCadastro: {
                required,
            },
            dataModificacao: {
                required,
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
            funcionario: {
                id: {
                    required,
                    maxLength: maxLength(10),
                }
            },
        };
    }
}