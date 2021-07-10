import { Features } from "@/Features";
import { IgtFeature, SaveData } from "incremental-game-template";
import { BeanCategory, BeanType } from "../bean/BeanList";
import Beans from "../bean/Beans";
import BeanUnlockRequirement from "../bean/BeanUnlockRequirement";
import GameController from "../GameController";
import Log from "../log/Log";
import BeanPacket from "./BeanPacket";
import BeanStalkPrestige from "./BeanStalkPrestige";
import Prestige from "./Prestige";

export interface PrestigeSaveData extends SaveData {
    prestiged: boolean;
    selectedBeanPackets: string[];
}

export default class PrestigeHandler extends IgtFeature {
    
    /**Internal references */
    private beans!: Beans;
    private log!: Log;
    private controller!: GameController;

    /**Possible Prestiges */
    public prestiges!: Prestige[];

    /**Prestige Modifiers */
    // TODO: Handle prestige bonus goals

    /**Bean Packets */
    public beanPackets!: BeanPacket[];
    /**Selected Bean Packets */
    public selectedBeanPackets: string[];

    /**Whether we're in Prestige mode */
    public prestiged: boolean;

    constructor() {
        super('prestige');

        this.prestiged = false;

        this.selectedBeanPackets = [];
    }

    initialize(features: Features): void {
        this.beans = features.beans;
        this.log = features.log;
        this.controller = features.controller;

        this.prestiges = [
            new BeanStalkPrestige(features),
        ];

        this.beanPackets = [
            new BeanPacket('Starter Beans', {'Sky Bean': 1},
            {'Bean': 10}),
            new BeanPacket('Colors I', {'Sky Bean': 1},
            {'Green Bean': 1, 'Yellow Bean': 1, 'Orange Bean': 1},
            new BeanUnlockRequirement(['Green Bean', 'Yellow Bean', 'Orange Bean'])),
        ];
    } 

    applyModifiers(value: number): number {
        // TODO: Handle bonus modifiers
        return value;
    }

    addPacket(packetName: string): boolean {
        if (this.selectedBeanPackets.includes(packetName)) {
            return false;
        }
        const packet = this.beanPackets.find((packet) => packet.name === packetName);
        if (!packet) {
            return false;
        }
        if (!this.beans.canAfford(packet.cost)) {
            return false;
        }

        // Updating Beans
        this.beans.gainAmount(packet.contents);
        this.beans.takeAmount(packet.cost);

        this.selectedBeanPackets.push(packetName);
        return true;
    }

    removePacket(packetName: string): boolean {
        const index = this.selectedBeanPackets.findIndex((selected) => selected === packetName);
        if (index < 0) {
            return false;
        }

        const packet = this.beanPackets.find((packet) => packet.name === packetName);
        if (!packet) {
            return false;
        }

        this.selectedBeanPackets.splice(index, 1);

        // Updating Beans
        this.beans.gainAmount(packet.cost);
        this.beans.takeAmount(packet.contents);
        return true;
    }

    clearCart() {
        const packets = [...this.selectedBeanPackets];
        packets.forEach((packet) => {
            this.removePacket(packet);
        });
    }

    /**
     * Handle cleanup up the game state to enter prestige mode
     */
    triggerPrestige() {
        // Clean up inventory
        Object.values(this.beans.list).forEach((bean) => {
            if (bean.category !== BeanCategory.Special) {
                this.beans.gain(bean.name as BeanType, -bean.amount)
            }
        });
        
        // Clear farms
        // TODO

        // Clear log
        this.log.clearLog();

        // Close modal
        this.controller.closeModal();

        // Switch state to prestige
        this.prestiged = true;
    }

    /**
     * Handle finishing up prestige mode and returning to the main game
     */
    completePrestige() {
        // Clear Bean Packet purchases
        this.selectedBeanPackets = [];

        // Add Bean if necessary
        if (this.beans.list['Bean'].amount <= 0) {
            this.beans.gain('Bean', 1);
        }

        // Switch state to main game
        this.prestiged = false;
    }

    load(data: PrestigeSaveData): void {
        this.prestiged = data.prestiged ?? false;
        this.selectedBeanPackets = data.selectedBeanPackets ?? [];
    }
    save(): PrestigeSaveData {
        return {
            prestiged: this.prestiged,
            selectedBeanPackets: this.selectedBeanPackets,
        };
    }

}