//VALIDATIONS
import { required, minLength } from "@vuelidate/validators";

import Category from './category'

export default class Service {
    constructor() {
        this.id = null;
        this.name = null;
        this.description = null;
        this.internalAccess = null;
        this.externalAccess = null;
        this.generalAccess = null;
        this.status = true;
        this.image = null;
        this.ipDatabase = null;
        this.ipServer = null;
        this.category = new Category();
    }
    validations() {
        return {
            name: {
                required,
                minLength: minLength(3),
            },
            generalAccess: {
                required,
            },
            internalAccess: {
                required,
            },
            externalAccess: {
                required,
            },
            ipServer: {
                required,
            },
            ipDatabase: {
                required,
            },
            category: {
                description: {
                    required,
                },
            },
            description: {
                required,
                minLength: minLength(10),
            },

        };
    }
}