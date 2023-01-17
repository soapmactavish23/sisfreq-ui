import { required } from "@vuelidate/validators";

export default class Groups {
    constructor() {
        this.id = null;
        this.description = null;
        this.service = null;
        this.permission = [];
    }

    validations() {
        return {
            description: {
                required,
            },
            service: {
                required,
            },
            permission: {
                required,
            },
        };
    }
}