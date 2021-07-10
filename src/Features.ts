import {IgtFeatures} from "incremental-game-template";

import Plants from "@/scripts/plant/Plants";
import GameController from "@/scripts/GameController";
import Beans from "@/scripts/bean/Beans";
import Farms from "@/scripts/farm/Farms";
import Log from "@/scripts/log/Log";
import { Settings } from "@/scripts/Settings";
import PrestigeHandler from "./scripts/prestige/PrestigeHandler";
import Upgrades from "./scripts/upgrade/Upgrades";
import Statistics from "./scripts/statistics/Statistics";

export interface Features extends IgtFeatures {
    settings: Settings;
    controller: GameController;
    beans: Beans;
    plants: Plants;
    farms: Farms;
    log: Log;
    prestige: PrestigeHandler;
    upgrades: Upgrades;
    statistics: Statistics;
}
