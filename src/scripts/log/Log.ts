import { Features } from "@/Features";
import { SaveData, IgtFeature, AbstractField } from "incremental-game-template";
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

    getDeveloperPanelFields(): AbstractField[] {
        return [];
    }
    initialize(features: Features): void {
        return;
    }
    start(): void {
        return;
    }
    stop(): void {
        return;
    }
    canAccess(): boolean {
        return true;
    }
    update(delta: number): void {
        return;
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

    log(message: string, color?: string) {
        // Creating entry
        const entry = new LogEntry(message, color);

        // Checking for duplicate entry
        const lastEntry = this.entries[this.entries.length-1];
        if (lastEntry && lastEntry.message.includes(entry.message)) {
            lastEntry.amount += 1;
        } else {
            // TODO: Add max entry setting
            // Removing extra entries
            while (this.entries.length >= this.defaultMaxEntries) {
                this.entries.shift();
            }
            this.entries.push(entry);
        }
    }

}