
export interface SVGData {
    viewBox: string;
    paths: SVGPath[];
}

interface SVGPath {
    stroke: string;
    d: string;
}

export const PlantImages: Record<string, SVGData> = {
{{{IMAGES}}}
}

export function getImage(name: string) {
    return PlantImages[name] ?? PlantImages['Missing Plant'];
}

export const PlantIcons: Record<string, SVGData> = {
{{{ICONS}}}
}