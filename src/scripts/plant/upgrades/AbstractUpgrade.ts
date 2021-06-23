
export default abstract class AbstractUpgrade {
    
    constructor(
        public name: string,
        public description: string,
        public baseCost: number,
    ) { }

    cost(level: number) {
        return level * this.baseCost;
    }

}