import {Game} from "./ig-template/Game";
import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {Achievements} from "@/ig-template/features/achievements/Achievements";
import {RedeemableCodes} from "@/ig-template/features/codes/RedeemableCodes";
import Plants from "./scripts/plant/Plants";
import GameController from "./scripts/GameController";
import Beans from "./scripts/bean/Beans";
import Farms from "./scripts/farm/Farms";
import Log from "./scripts/log/Log";

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
                settings: new Settings(),
                codes: new RedeemableCodes(),
                statistics: new Statistics(),
                achievements: new Achievements(),
                controller: new GameController(),
                beans: new Beans(),
                plants: new Plants(),
                farms: new Farms(),
                log: new Log(),
            }
        );
    }
}
