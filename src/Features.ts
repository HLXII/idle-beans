import {IgtFeatures} from "incremental-game-template";

import Plants from "@/scripts/plant/Plants";
import GameController from "@/scripts/GameController";
import Beans from "@/scripts/bean/Beans";
import Farms from "@/scripts/farm/Farms";
import Log from "@/scripts/log/Log";
import { Settings } from "@/scripts/Settings";

export interface Features extends IgtFeatures {
    settings: Settings;
    controller: GameController;
    beans: Beans;
    plants: Plants;
    farms: Farms;
    log: Log;
}
