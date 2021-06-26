import { Features } from "@/Features";
import { SaveData, IgtFeature, AbstractField } from "incremental-game-template";
import { GameText } from "../controls/GameText";
import LogEntry, { LogEntrySaveData } from "./LogEntry";

export interface LogSaveData extends SaveData {
    entries: LogEntrySaveData[];
}

export default class Log extends IgtFeature {

    public entries: LogEntry[];
    public readonly defaultMaxEntries = 100;

    constructor() {
        super('log');
        this.entries = [];
    }
    
    canAccess(): boolean {
        return true;
    }

    load(data: LogSaveData): void {
        data?.entries.forEach((entryData) => {
            const entry = new LogEntry();
            entry.load(entryData);
            this.entries.push(entry);
        });
    }
    save(): LogSaveData {
        return {
            entries: this.entries.map(entry => entry.save())
        };
    }

    clearLog() {
        this.entries.splice(0, this.entries.length);
    }

    log(message: GameText[], color?: string) {
        // Creating entry
        const entry = new LogEntry(message, color);

        // TODO: Add max entry setting
        // Removing extra entries
        while (this.entries.length >= this.defaultMaxEntries) {
            this.entries.shift();
        }
        this.entries.push(entry);
    }

}