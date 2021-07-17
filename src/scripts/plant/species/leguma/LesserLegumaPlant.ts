import { GameText } from "@/scripts/controls/GameText";
import Plant from "../../Plant";
import UpgradeState from "../../upgrades/UpgradeState";

export default class LesserLegumaPlant extends Plant {
    baseDescription: GameText[] = [];

    description: GameText[] = [];
    
    upgrades: UpgradeState[] = [
        new UpgradeState('Wider Leaves', {'Sky Bean': 1}),
        new UpgradeState('Increased Bud Sites', {'Sky Bean': 2}),
        new UpgradeState('Stem Strength', {'Sky Bean': 3}),
    ];

}