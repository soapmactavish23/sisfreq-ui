import { maxLength, required } from "vuelidate/lib/validators";

export default class Grupo {
  constructor() {
    this.id = null;
    this.descricao;
    this.permissoes = [];
  }
  validations() {
    return {
      descricao: {
        required,
        maxLength: maxLength(50),
      },
      permissoes: {
        required
      }
    };
  }
}
