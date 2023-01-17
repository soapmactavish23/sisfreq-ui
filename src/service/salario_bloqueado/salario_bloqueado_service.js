import Token from "../../utilities/jwt/Token";

export default class SalarioBloqueadoService extends Token {
  constructor() {
    super("salario-bloqueado");
  }

  findByAnoMesAtuacao(ano, mes, atuacao) {
    return this.execute("GET", `/${ano}/${mes}/${atuacao}`).then(
      (res) => res.data
    );
  }
}
