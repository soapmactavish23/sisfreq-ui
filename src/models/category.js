import { required } from "@vuelidate/validators";
export default class Category {
    constructor() {
        this.id = null;
        this.description = null;
    }
    validations() {
        return {
            description: {
                required,
            }
        };
    }
}