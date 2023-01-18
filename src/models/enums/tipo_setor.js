export let TipoSetor = [
    {
        key: "OFICIAL",
        name: "Oficial",
    },
    {
        key: "OFICIOSO",
        name: "Oficioso",
    },
];

export function convertTipoSetor(tipoSetor) {
    const value = TipoSetor.find((type) => type.key == tipoSetor);
    return value.name;
}