import { required, maxLength } from "@vuelidate/validators";
export default class Setor {

    constructor() {
        this.id = null;
        this.tipoSetor = null;
        this.sigla = null;
        this.nome = null;
        this.ativo = null;
        this.dataCadastro = null;
        this.dataModificacao = null;

    }
    validations() {
        return {
            sigla: {
                maxLength: maxLength(20),
            },
            nome: {
                required,
                maxLength: maxLength(100),
            },
            tipoSetor: {
                required,
                maxLength: maxLength(20),
            },
            ativo: {
                required,
                maxLength: maxLength(3),
            },
            dataCadastro: {
                required,
            },
            dataModificacao: {
                required,
            },
        };
    }
}