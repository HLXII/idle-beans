import { App } from "@/App";
import { GameText } from "@/scripts/controls/GameText";
import Plot from "@/scripts/farm/Plot";
import GameHelper from "@/scripts/GameHelper";
import { WikiType } from "@/scripts/wiki/Wiki";
import { PlantType } from "../../PlantList";
import PlotRequirement, { MinimalPlot } from "./PlotRequirement";

export type PlantReq = PlantType | {plant: PlantType; amount: number};

function ContainReq<GReqClass extends MinimalPlot>(Base: GReqClass) {
    return class extends Base {

        public data: {plant: PlantType; amount: number}[]; 

        constructor(...args: any[]) {
            const [datum, ...rest] = args;
            super(...rest);
            
            // Typecasting data
            let data: PlantReq | PlantReq[] = datum;

            // Collapsing data parameter
            if (!Array.isArray(data)) {
                data = [data];
            }
            // Defaulting amount
            this.data = data.map((datum) => {
                if (typeof datum === 'string') {
                    return {plant: datum, amount: 1};
                } else {
                    return datum;
                }
            });
        }
    
        plotConditions(plots: Plot[]): boolean {
            return PlotRequirement.containsAtLeast(plots, this.data);
        }
    
        public visible(): boolean {
            return this.data.some((datum) => App.game.features.plants.list[datum.plant].unlocked);
        }
     
        get description(): GameText[] {
            const data: GameText[][] = this.data.map((datum) => {
                return [
                    `${datum.amount} `,
                    {text: `${datum.plant}${datum.amount > 1 ? 's' : ''}`, type: WikiType.Plant, id: datum.plant},
                ]
            });
            
            return [
                ...super.description,
                ' that contain at least ',
                ...GameHelper.gameTextList(data, 'and'),
            ];
        }

    };
}

// Utility type so that typescript can figure out
// the constructor params for our lifted evolution
type ContainsReq<T extends Constructor<any>> =
    new (data: PlantReq | PlantReq[],
         ...rest: ConstructorParameters<T>
        )
    => InstanceType<T>

export default function PlotsContain<T extends Constructor<any>>(Base: T): ContainsReq<T> {
    return ContainReq(Base);
}