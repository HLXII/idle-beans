import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {Achievements} from "@/ig-template/features/achievements/Achievements";
import {RedeemableCodes} from "@/ig-template/features/codes/RedeemableCodes";
import Plants from "@/scripts/plant/Plants";
import GameController from "@/scripts/GameController";
import Beans from "@/scripts/bean/Beans";
import Farms from "@/scripts/farm/Farms";
import Log from "@/scripts/log/Log";

export interface Features {
    settings: Settings;
    codes: RedeemableCodes;
    statistics: Statistics;
    achievements: Achievements;
    controller: GameController;
    beans: Beans;
    plants: Plants;
    farms: Farms;
    log: Log;
}
