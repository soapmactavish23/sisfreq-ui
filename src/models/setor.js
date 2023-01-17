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
                maxLength: maxLength(10),
            },
            nome: {
                required,
                maxLength: maxLength(100),
            },
            tipo_setor: {
                required,
                maxLength: maxLength(100),
            },
            ativo: {
                required,
                maxLength: maxLength(2),
            },
            dt_cadastro: {
                id: {
                    required,
                    maxLength: maxLength(10),
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