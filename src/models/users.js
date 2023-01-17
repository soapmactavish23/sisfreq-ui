import Person from "./person";
import { required, email, minLength } from "@vuelidate/validators";

export default class Users {
  constructor() {
    this.id = null;
    this.login = null;
    this.password = null;
    this.email = null;
    this.status = true;
    this.dtCreated = null;
    this.dtUpdate = null;
    this.person = new Person();
    this.group = [];
  }

  validationsCreate() {
    return {
      login: {
        required,
      },
      password: {
        required,
      },
      email: {
        required,
        email,
      },
    };
  }
  validations() {
    return {
      login: {
        required,
      },
      password: {
        minLength: minLength(6),
      },
      email: {
        required,
        email,
      },
      person: {
        credential: {
          required,
        }
      },
      group: {
        required,
      },
    };
  }

}
