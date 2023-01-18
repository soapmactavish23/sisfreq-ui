export let Ativo = [
    {
        key: "true",
        name: "ATIVO",
    },
    {
        key: "false",
        name: "INATIVO",
    },
];

export function convertAtivo(status) {
    const value = Ativo.find((active) => active.key == status);
    return value.name;
}