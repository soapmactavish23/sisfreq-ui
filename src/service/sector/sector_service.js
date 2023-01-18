
import Token from "../../utilities/jwt/Token.js";
import { gerarUrl } from "../../utilities/utils/Pageable";

export default class SectorService extends Token {
  constructor() {
    super('setor');
  }

  find(params) {
    let queryParams = gerarUrl(params);
    return this.execute("GET", `?${queryParams}`).then((res) => res.data);
  }
} 
