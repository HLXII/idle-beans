import { WikiType } from "../wiki/WikiType";

export type GameText = string | LinkText;

export interface LinkText {
    text: string;
    type?: WikiType;
    id?: string;
}