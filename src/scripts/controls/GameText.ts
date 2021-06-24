
export type GameText = string | LinkText;

export interface LinkText {
    text: string;
    type?: LinkType;
    id?: string;
}

export enum LinkType {
    Bean,
    Plant,
}