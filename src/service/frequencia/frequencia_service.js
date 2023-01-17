import Token from "../../utilities/jwt/Token";

export default class FrequenciaService extends Token {
  constructor() {
    super("frequencia");
  }

  totalFrequencias() {
    return this.execute("GET", "/total-frequencias").then((res) => res.data);
  }

  totalFrequenciasOrigemAtuacaoDiferentes() {
    return this.execute("GET", "/total-frequencias-origem-atuacao-diferentes");
  }

  totalFrequenciasEnviadas() {
    return this.execute("GET", "/total-frequencias-enviadas");
  }

  
}
