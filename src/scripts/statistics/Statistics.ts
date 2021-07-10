import { Features } from "@/Features";
import { IgtStatistics, NumberStatistic } from "incremental-game-template";

export default class Statistics extends IgtStatistics {


    initialize(_features: Features) {

        //#region Globals
        //this.registerStatistic(new NumberStatistic('Total Time Played', 'Total time played', 0));
        //this.registerStatistic(new NumberStatistic('Total Prestiges', 'Total number of times you have prestiged.', 0));
        //#endregion

        //#region Local Game
        //this.registerStatistic(new NumberStatistic('Time Played this run', 'Time since this run started', 0));
        //#endregion
    }

}