import { SaveData, Saveable } from "incremental-game-template";
import { GameText } from "../controls/GameText";

export interface LogEntrySaveData extends SaveData {
    message: GameText[];
    color: string;
    time: number;
}

export default class LogEntry implements Saveable {

    public message: GameText[];
    public color: string;
    public time: Date;

    constructor(message: GameText[] = [], color: string = 'dark') {
        this.message = message;
        this.color = color;
        this.time = new Date();
    }

    saveKey = '';
    save(): LogEntrySaveData {
        return {
            message: this.message,
            color: this.color,
            time: this.time.getTime(),
        }    
    }
    load(data: LogEntrySaveData): void {
        this.message = data?.message ?? [];
        this.color = data?.color ?? '';
        this.time = new Date(data?.time);
    }
    
}
