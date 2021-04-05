import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {Achievements} from "@/ig-template/features/achievements/Achievements";
import {RedeemableCodes} from "@/ig-template/features/codes/RedeemableCodes";
import Beans from "./features/bean/Beans";
import Plants from "./features/plant/Plants";
import Farm from "./features/farm/Farm";
import GameController from "./features/GameController";

export interface Features {
    settings: Settings;
    codes: RedeemableCodes;
    statistics: Statistics;
    achievements: Achievements;
    controller: GameController;
    beans: Beans;
    plants: Plants;
    farm: Farm;
}
