import Token from "../../utilities/jwt/Token";
import { gerarUrl } from "../../utilities/utils/Pageable";

export default class FuncionarioService extends Token {
  constructor() {
    super("funcionario");
  }

  find(params) {
    let queryParams = gerarUrl(params);
    return this.execute("GET", `/${queryParams}`).then((res) => res.data);
  }

  totalFuncionarios() {
    return this.execute("GET", "/total").then((res) => res.data);
  }

  totalFuncionariosLotacaoAtuacaoDiferentes() {
    return this.execute("GET", "/total-por-situacao").then((res) => res.data);
  }

  totalFuncionariosTipoAfastamento() {
    return this.execute("GET", "/total-por-tipo-afastamento").then((res) => res.data);
  }

}
