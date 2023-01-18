export let TipoAfastamento = [
    {
        key: "AAG",
        name: "AAG",
    },
    {
        key: "ABC",
        name: "ABC",
    },
    {
        key: "ABE",
        name: "ABE",
    },
    {
        key: "ABT",
        name: "ABT",
    },
    {
        key: "ACA",
        name: "ACA",
    },
    {
        key: "ACC",
        name: "ACC",
    },
    {
        key: "ACD",
        name: "ACD",
    },
    {
        key: "ACE",
        name: "ACE",
    },
    {
        key: "ACP",
        name: "ACP",
    },
    {
        key: "ACS",
        name: "ACS",
    },
    {
        key: "ADJ",
        name: "ADJ",
    },
    {
        key: "AEC",
        name: "AEC",
    },
    {
        key: "AEE",
        name: "AEE",
    },
    {
        key: "AEL",
        name: "AEL",
    },
    {
        key: "AEP",
        name: "AEP",
    },
    {
        key: "AET",
        name: "AET",
    },
    {
        key: "AEV",
        name: "AEV",
    },
    {
        key: "AEX",
        name: "AEX",
    },
    {
        key: "AFA",
        name: "AFA",
    },
    {
        key:"AFE",
        name: "AFE",
    },
    {
        key:"AFR",
        name: "AFR",
    },
    {
        key:"AFT",
        name: "AFT",
    },
    {
        key:"AGA",
        name: "AGA",
    },
    {
        key:"AGD",
        name: "AGD",
    },
    {
        key:"AGI",
        name: "AGI",
    },
    {
        key:"AGR",
        name: "AGR",
    },
    {
        key:"AGS",
        name: "AGS",
    },
    {
        key:"AIN",
        name: "AIN",
    },
    {
        key:"AIP",
        name: "AIP",
    },
    {
        key:"AJC",
        name: "AJC",
    },
    {
        key:"AOE",
        name: "AOE",
    },
    {
        key:"APG",
        name: "APG",
    },
    {
        key:"APJ",
        name: "APJ",
    },
    {
        key:"APP",
        name: "APP",
    },
    {
        key:"APR",
        name: "APR",
    },
    {
        key:"APS",
        name: "APS",
    },
    {
        key:"ARC",
        name: "ARC",
    },
    {
        key:"ASA",
        name: "ASA",
    },
    {
        key:"ASF",
        name: "ASF",
    },
    {
        key:"ASJ",
        name: "ASJ",
    },
    {
        key:"ASP",
        name: "ASP",
    },
    {
        key:"AUS",
        name: "AUS",
    },
    {
        key:"DEP",
        name: "DEP",
    },
    {
        key:"DES",
        name: "DES",
    },
    {
        key:"DJF",
        name: "DJF",
    },
    {
        key:"DJP",
        name: "DJP",
    },
    {
        key:"ITS",
        name: "ITS",
    },
    {
        key:"LAC",
        name: "LAC",
    },
    {
        key:"LAP",
        name: "LAP",
    },
    {
        key:"LAT",
        name: "LAT",
    },
    {
        key:"LCE",
        name: "LCE",
    },
    {
        key:"LCP",
        name: "LCP",
    },
    {
        key:"LDF",
        name: "LDF",
    },
    {
        key:"LEP",
        name: "LEP",
    },
    {
        key:"LFM",
        name: "LFM",
    },
    {
        key:"LIP",
        name: "LIP",
    },
    {
        key:"LJU",
        name: "LJU",
    },
    {
        key:"LMA",
        name: "LMA",
    },
    {
        key:"LMD",
        name: "LMD",
    },
    {
        key:"LMF",
        name: "LMF",
    },
    {
        key:"LMP",
        name: "LMP",
    },
    {
        key:"LPA",
        name: "LPA",
    },
    {
        key:"LPF",
        name: "LPF",
    },
    {
        key:"LPG",
        name: "LPG",
    },
    {
        key:"LPS",
        name: "LPS",
    },
    {
        key:"LSM",
        name: "LSM",
    },
    {
        key:"LSP",
        name: "LSP",
    },
    {
        key:"LTS",
        name: "LTS",
    },
    {
        key:"MAD",
        name: "MAD",
    },
    {
        key:"MPG",
        name: "MPG",
    },
    {
        key:"SCT",
        name: "SCT",
    },
    {
        key:"SUS",
        name: "SUS",
    },
    {
        key:"TBE",
        name: "TBE",
    },
    {
        key:"VMO",
        name: "VMO",
    },
];

export function convertTipoAfastamento(situacao) {
    const value = TipoAfastamento.find((type) => type.key == situacao);
    return value.name;
}

