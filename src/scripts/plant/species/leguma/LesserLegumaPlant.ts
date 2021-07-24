import { GameText } from "@/scripts/controls/GameText";
import LegumaPlant from "../../LegumaPlant";
import UpgradeState from "../../upgrades/UpgradeState";

export default class LesserLegumaPlant extends LegumaPlant {

    baseDescription: GameText[] = [];

    public baseLegumaProduce: number = 1;
    
    upgrades: UpgradeState[] = [
        new UpgradeState('Wider Leaves', {'Sky Bean': 1}),
        new UpgradeState('Increased Bud Sites', {'Sky Bean': 2}),
        new UpgradeState('Stem Strength', {'Sky Bean': 3}),
    ];

}