import { required } from "@vuelidate/validators";
export default class Local {
    constructor() {
        this.id = null;
        this.name = null;
    }
    validations() {
        return {
            name: {
                required,
            },
        };
    }
}