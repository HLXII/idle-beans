import { NoRequirement, Requirement } from "incremental-game-template";
import { BeanAmount } from "../bean/BeanList";

export default class BeanPacket {

    constructor(public name: string, public cost: BeanAmount, public contents: BeanAmount, public requirement: Requirement = new NoRequirement()) { }

}