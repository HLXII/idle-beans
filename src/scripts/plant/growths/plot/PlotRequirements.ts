
import PlotsContain from "./ContainsRequirement";
import DiagPlotsRequirement from "./DiagPlotsRequirement";
import NearPlotsRequirement from "./NearPlotsRequirement";
import OrthoPlotsRequirement from "./OrthoPlotsRequirement";

export const DiagContainsRequirement = PlotsContain(DiagPlotsRequirement);
export const NearContainsRequirement = PlotsContain(NearPlotsRequirement);
export const OrthoContainsRequirement = PlotsContain(OrthoPlotsRequirement);
