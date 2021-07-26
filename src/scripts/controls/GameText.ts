import { WikiType } from "../wiki/Wiki";

export type GameText = string | LinkText;

export interface LinkText {
    text: string;
    type?: WikiType;
    id?: string;
}