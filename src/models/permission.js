import { required } from "@vuelidate/validators";

export default class Permission {
    constructor() {
        this.id = null;
        this.description = null;
    }


    validations() {
        return {
            description: {
                required,
            },
        };
    }
}