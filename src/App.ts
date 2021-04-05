import {Game} from "./ig-template/Game";
import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {Achievements} from "@/ig-template/features/achievements/Achievements";
import {RedeemableCodes} from "@/ig-template/features/codes/RedeemableCodes";
import Beans from "./ig-template/features/bean/Beans";
import Plants from "./ig-template/features/plant/Plants";
import Farm from "./ig-template/features/farm/Farm";
import GameController from "./ig-template/features/GameController";

export class App {
    static inProduction: boolean = (process.env.NODE_ENV === "production");

    static game: Game;

    static start(): void {

        this.game = this.getDefaultGame();
        this.game.initialize();
        this.game.load();
        this.game.start();
    }


    public static getDefaultGame(): Game {
        return new Game(
            {
                // TODO Add more currencies here
                settings: new Settings(),
                codes: new RedeemableCodes(),
                statistics: new Statistics(),
                achievements: new Achievements(),
                controller: new GameController(),
                beans: new Beans(),
                plants: new Plants(),
                farm: new Farm(),
            }
        );
    }
}
