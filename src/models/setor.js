import { required, maxLength } from "@vuelidate/validators";
export default class Setor {

    constructor() {
        this.id = null;
        this.tipoSetor = null;
        this.sigla = null;
        this.nome = null;
        this.ativo = 1;
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
            },
        };
    }
}