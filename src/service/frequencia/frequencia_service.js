import Token from "../../utilities/jwt/Token";
import { gerarUrl } from "../../utilities/utils/Pageable";

export default class FrequenciaService extends Token {
  constructor() {
    super("frequencia");
  }

  find(params) {
    let queryParams = gerarUrl(params);
    return this.execute("GET", `?${queryParams}`).then((res) => res.data);
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
