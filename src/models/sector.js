import { required } from "@vuelidate/validators";
import Local from "./local";
export default class Sector {
    constructor() {
        this.id = null;
        this.local = new Local();
        this.name = null;
        this.acronym = null;
    }
    validations() {
        return {
            local: {
                name: {
                    required,
                }
            },
            name: {
                required,
            },
        };
    }
}