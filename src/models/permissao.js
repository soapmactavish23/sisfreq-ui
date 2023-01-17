import { required, maxLength } from "@vuelidate/validators";

export default class Permissao {
    constructor() {
        this.id = null;
        this.descricao = null;
    }


    validations() {
        return {
            descricao: {
                required,
                maxLength: maxLength(20),
            },
        };
    }
}