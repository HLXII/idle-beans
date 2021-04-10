import { Saveable } from "@/ig-template/tools/saving/Saveable";
import { SaveData } from "@/ig-template/tools/saving/SaveData";


export interface LogEntrySaveData extends SaveData {
    message: string;
    color: string;
    amount: number;
    time: number;
}

export default class LogEntry implements Saveable {

    public message: string;
    public color: string;
    public amount: number;
    public time: number;

    constructor(message: string = '', color: string = 'dark', amount: number = 1) {
        this.message = message;
        this.color = color;
        this.amount = amount;
        this.time = Date.now();
    }

    // TODO: Add setting to remove time from message
    get logMessage(): string {
        if (this.amount > 1) {
            return `${(new Date(this.time)).toString()} ${this.message} (${this.amount}x)`;
        } else {
            return `${(new Date(this.time)).toString()} ${this.message}`;
        }
    }

    saveKey = '';
    save(): LogEntrySaveData {
        return {
            message: this.message,
            color: this.color,
            amount: this.amount,
            time: this.time,
        }    
    }
    load(data: LogEntrySaveData): void {
        this.message = data?.message ?? '';
        this.color = data?.color ?? '';
        this.amount = data?.amount ?? 0;
        this.time = data?.time ?? Date.now();
    }
    
}
