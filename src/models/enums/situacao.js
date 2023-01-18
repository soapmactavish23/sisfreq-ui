export let SituacaoFuncionario = [
    {
        key: "NORMAL",
        name: "Normal",
    },
    {
        key: "COD",
        name: "Cedido ônus destino",
    },
    {
        key: "COO",
        name: "Cedido ônus destino",
    },
    {
        key: "DEMITIDO",
        name: "Demitido",
    },
    {
        key: "FALECIDO",
        name: "Falecido",
    },
    {
        key: "EXONERADO",
        name: "Exonerado",
    },
    {
        key: "APOSENTADO",
        name: "Aposentado",
    },
    {
        key: "DISTRATADO",
        name: "Distratado",
    },
];

export function convertSituacaoFuncionario(situacao) {
    const value = SituacaoFuncionario.find((type) => type.key == situacao);
    return value.name;
}