import {IgtGame} from "incremental-game-template";
import {Features} from "@/Features";

export class Game extends IgtGame {
    protected readonly SAVE_KEY: string = 'idle-beans';
    protected readonly TICK_DURATION: number = 0.05;
    features: Features;

    constructor(features: Features) {
        super();
        this.features = features;
    }
}
