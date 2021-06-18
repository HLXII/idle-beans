
interface PlantImage {
    viewBox: string;
    paths: PlantPath[];
}

interface PlantPath {
    stroke: string;
    d: string;
}

export const PlantImages: Record<string, PlantImage> = {
{{{IMAGES}}}
}