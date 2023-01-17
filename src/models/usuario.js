import { maxLength, required } from "vuelidate/lib/validators";
import Grupo from "./grupo";

export default class Usuario {
  constructor() {
    this.id = null;
    this.nome = null;
    this.contato = null;
    this.email = null;
    this.senha = null;
    this.status = true;
    this.grupos = new Grupo();
  }
  validations() {
    return {
      nome: {
        required,
        maxLength: maxLength(50),
      },
      contato: {
        required,
        maxLength: maxLength(16),
      },
      email: {
        required,
        maxLength: maxLength(50),
      },
      senha: {
        required,
        maxLength: maxLength(150),
      },
      status: {
        required,
      },
      grupo: {
        required,
      },
    };
  }
}
