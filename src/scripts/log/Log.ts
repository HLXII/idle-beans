import { Features } from "@/Features";
import { SaveData, IgtFeature, AbstractField } from "incremental-game-template";
import { GameText } from "../controls/GameText";
import { Settings } from "../Settings";
import LogEntry, { LogEntrySaveData } from "./LogEntry";

export enum EntryType {
    'Normal' = 0,
    'Unlock',
    'Growth',
    'Removal',
}

export interface LogSaveData extends SaveData {
    entries: LogEntrySaveData[];
}

export default class Log extends IgtFeature {

    private settings!: Settings;

    public entries: LogEntry[];
    public readonly defaultMaxEntries = 100;

    constructor() {
        super('log');
        this.entries = [];
    }
    
    initialize(features: Features) {
        this.settings = features.settings;
    }

    canAccess(): boolean {
        return true;
    }

    /**
     * Clears the log
     */
    clearLog() {
        this.entries.splice(0, this.entries.length);
    }

    /**
     * Log a message
     * @param message The message information 
     * @param type The EntryType
     */
    log(message: GameText[], type: EntryType = EntryType.Normal) {

        // Checking if this message should be ignored
        // TODO:

        // Creating entry
        const entry = new LogEntry(message, type);

        // TODO: Add max entry setting
        // Removing extra entries
        while (this.entries.length >= this.defaultMaxEntries) {
            this.entries.shift();
        }
        this.entries.push(entry);
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
}