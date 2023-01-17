export default class Setor {

    constructor() {
    this.id = null;
    this.tipoSetor = null;
    this.sigla = null;
    this.nome = null;
    this.ativo = null;
    this.dataCadastro = null;
    this.dataModificacao = null;    

    }
    validations() {
        return {
            idsetor: {
                required,
            },
            nome: {
                required,
            },
            tipo_setor: {
                required,
            },
            ativo: {
                required,
            },
            dt_cadastro: {
                id: {
                    required,
                }
            },
            dt_modificacao: {
                id: {
                    required,
                }
            },
        };
    }
}