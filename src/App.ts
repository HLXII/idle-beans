import Plants from "./scripts/plant/Plants";
import GameController from "./scripts/GameController";
import Beans from "./scripts/bean/Beans";
import Farms from "./scripts/farm/Farms";
import Log from "./scripts/log/Log";
import { Game } from "./Game";
import { Settings } from "./scripts/Settings";
import PrestigeHandler from "./scripts/prestige/PrestigeHandler";
import Upgrades from "./scripts/upgrade/Upgrades";
import Statistics from "./scripts/statistics/Statistics";

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
                controller: new GameController(),
                beans: new Beans(),
                plants: new Plants(),
                farms: new Farms(),
                log: new Log(),
                prestige: new PrestigeHandler(),
                upgrades: new Upgrades(),
                statistics: new Statistics(),
            }
        );
    }
}
