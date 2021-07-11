import { SaveData, Saveable } from "incremental-game-template";
import { GameText } from "../controls/GameText";
import { EntryType } from "./Log";

export interface LogEntrySaveData extends SaveData {
    message: GameText[];
    type: EntryType;
    time: number;
}

export default class LogEntry implements Saveable {

    public time: Date;

    constructor(public message: GameText[] = [], public type: EntryType = EntryType.Normal) {
        this.time = new Date();
    }

    saveKey = '';
    save(): LogEntrySaveData {
        return {
            message: this.message,
            type: this.type,
            time: this.time.getTime(),
        }    
    }
    load(data: LogEntrySaveData): void {
        this.message = data?.message ?? [];
        this.type = data?.type ?? EntryType.Normal;
        this.time = new Date(data?.time);
    }
    
}
