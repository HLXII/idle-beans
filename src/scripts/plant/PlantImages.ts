
interface PlantImage {
    viewBox: string;
    paths: PlantPath[];
}

interface PlantPath {
    stroke: string;
    d: string;
}

export const PlantImages: Record<string, PlantImage> = {
    "Bean Bud": {
        viewBox: "0 -0.5 16 16",
        paths: [
            { stroke: "#b3c189", d: "M8 6h1M7 7h2M7 8h1" },
            { stroke: "#99b051", d: "M9 6h1M9 7h1M8 8h1" },
        ],
    },
    "Bean Plant": {
        viewBox: "0 -0.5 16 32",
        paths: [
            { stroke: "#b3c189", d: "M4 13h3M11 13h3M6 14h9M6 15h3M11 15h1M13 15h2M4 16h4M14 16h1M3 17h3M9 17h1M14 17h1M9 18h1M9 19h1M9 20h1M9 21h1M8 22h1M7 23h2M6 24h2M9 24h1M7 25h1" },
            { stroke: "#99b051", d: "M5 14h1M9 15h2M12 15h1M8 16h2M13 16h1M6 17h1M10 17h1M3 18h3M10 18h1M10 19h1M10 20h1M10 21h1M9 22h1M9 23h1M8 24h1M9 25h1" },
            { stroke: "#7ac549", d: "M11 16h1M11 17h1M6 18h2M7 19h1M7 20h1M6 21h1" },
            { stroke: "#acdc82", d: "M12 17h1M11 18h1M6 19h1M5 20h2M5 21h1" },
        ],
    },
    "Bean Sprout": {
        viewBox: "0 -0.5 16 16",
        paths: [
            { stroke: "#c6c95f", d: "M7 2h2M7 3h1M7 4h1" },
            { stroke: "#9ea142", d: "M8 3h1" },
            { stroke: "#b3c189", d: "M9 3h1M9 4h1M9 5h1M8 6h1M7 7h2M7 8h1" },
            { stroke: "#99b051", d: "M9 6h1M9 7h1M8 8h1" },
        ],
    },
    "Bean Stalk": {
        viewBox: "0 -0.5 16 64",
        paths: [
            { stroke: "#3ab654", d: "M10 26h2M8 27h3M7 28h2M5 29h3M12 29h1M4 30h3M12 30h1M4 31h3M12 31h2M3 32h3M12 32h2M2 33h4M12 33h2M2 34h3M12 34h2M1 35h4M12 35h3M1 36h3M12 36h3M1 37h3M12 37h2M0 38h4M11 38h3M0 39h4M10 39h4M0 40h4M10 40h3M1 41h4M9 41h3M1 42h5M9 42h3M2 43h5M8 43h2M2 44h7M2 45h8M3 46h8M3 47h9M4 48h9M5 49h8M3 50h2M6 50h8M3 51h2M7 51h7M2 52h2M8 52h7M1 53h3M9 53h6M1 54h3M10 54h4M1 55h2M10 55h3" },
            { stroke: "#29863d", d: "M9 28h2M8 29h2M7 30h3M7 31h2M6 32h2M6 33h2M14 33h1M5 34h2M14 34h1M5 35h2M15 35h1M4 36h3M15 36h1M4 37h2M14 37h2M4 38h2M14 38h2M4 39h2M14 39h2M4 40h3M13 40h3M0 41h1M5 41h2M12 41h4M0 42h1M6 42h1M12 42h3M0 43h2M7 43h1M10 43h5M1 44h1M9 44h5M1 45h1M10 45h3M2 46h1M11 46h1M2 47h1M3 48h1M3 49h2M13 49h1M2 50h1M5 50h1M14 50h1M2 51h1M5 51h2M14 51h1M1 52h1M4 52h4M15 52h1M0 53h1M4 53h5M15 53h1M0 54h1M4 54h3M9 54h1M14 54h2M0 55h1M3 55h3M13 55h3" },
        ],
    },
    "Bean Vine": {
        viewBox: "0 -0.5 16 32",
        paths: [
            { stroke: "#8db952", d: "M8 11h1M9 12h1M9 13h1M9 14h2M10 15h1M10 16h1M9 17h1M9 18h1M9 19h1M8 20h1M8 21h1M7 22h2M6 23h2M6 24h2M5 25h1M8 25h1M9 26h1M4 27h1M9 27h1" },
            { stroke: "#7fa34e", d: "M10 17h1M10 18h1M10 19h1M9 20h1M9 21h1M9 22h1M8 23h1M8 24h1M6 25h2M5 26h1M8 26h1" },
        ],
    },
    "Blue Bean Sprout": {
        viewBox: "0 -0.5 16 16",
        paths: [
            { stroke: "#2e6eee", d: "M7 2h2M7 3h1M7 4h1" },
            { stroke: "#355eb0", d: "M8 3h1" },
            { stroke: "#b3c189", d: "M9 3h1M9 4h1M9 5h1M8 6h1M7 7h2M7 8h1" },
            { stroke: "#99b051", d: "M9 6h1M9 7h1M8 8h1" },
        ],
    },
    "Green Bean Plant": {
        viewBox: "0 -0.5 16 32",
        paths: [
            { stroke: "#b3c189", d: "M9 13h2M8 14h2M13 14h1M4 15h3M8 15h2M12 15h2M6 16h7M8 17h1M7 18h1M9 19h1M9 20h1M8 21h2M8 22h1M7 23h2M6 24h2M9 24h1M7 25h1" },
            { stroke: "#508f26", d: "M10 14h1M5 17h1M12 17h1M6 18h1M11 18h1M6 19h1M12 19h1M5 20h1" },
            { stroke: "#5bb91d", d: "M10 15h1M5 18h1M12 18h2M4 19h2M13 19h1M4 20h1" },
            { stroke: "#99b051", d: "M5 16h1M13 16h1M6 17h2M9 17h3M8 18h2M10 19h1M10 20h1M10 21h1M9 22h1M9 23h1M8 24h1M9 25h1" },
        ],
    },
    "Yellow Bean Plant": {
        viewBox: "0 -0.5 16 32",
        paths: [
            { stroke: "#b3c189", d: "M3 12h2M9 12h2M3 13h3M8 13h3M5 14h5M11 14h4M7 15h1M9 15h2M8 16h2M8 17h1M7 18h1M7 19h1M7 20h1M8 21h1M8 22h1M7 23h2M6 24h2M9 24h1M7 25h1" },
            { stroke: "#99b051", d: "M4 14h1M5 15h2M8 15h1M11 15h3M7 16h1M10 16h1M9 17h1M8 18h1M8 19h1M8 20h1M9 21h1M9 22h1M9 23h1M8 24h1M9 25h1" },
            { stroke: "#d1da4e", d: "M4 15h1M4 16h2M3 17h3M11 17h2M3 18h2" },
            { stroke: "#bbb952", d: "M6 16h1M11 16h2M6 17h1M2 18h1M5 18h1M3 19h2" },
        ],
    },
    "Yellow Bean Sprout": {
        viewBox: "0 -0.5 16 16",
        paths: [
            { stroke: "#ffdf50", d: "M7 2h2M7 3h1M7 4h1" },
            { stroke: "#d3a44f", d: "M8 3h1" },
            { stroke: "#b3c189", d: "M9 3h1M9 4h1M9 5h1M8 6h1M7 7h2M7 8h1" },
            { stroke: "#99b051", d: "M9 6h1M9 7h1M8 8h1" },
        ],
    },
}