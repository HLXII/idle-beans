import { Saveable } from "@/ig-template/tools/saving/Saveable";
import { SaveData } from "@/ig-template/tools/saving/SaveData";


export interface LogEntrySaveData extends SaveData {
    message: string;
    color: string;
    amount: number;
}

export default class LogEntry implements Saveable {

    public message: string;
    public color: string;
    public amount: number;

    constructor(message: string = '', color: string = 'dark', amount: number = 1) {
        this.message = message;
        this.color = color;
        this.amount = amount;
    }

    get logMessage(): string {
        if (this.amount > 1) {
            return `${this.message} (${this.amount}x)`;
        } else {
            return this.message;
        }
    }

    saveKey = '';
    save(): LogEntrySaveData {
        return {
            message: this.message,
            color: this.color,
            amount: this.amount,
        }    
    }
    load(data: LogEntrySaveData): void {
        this.message = data?.message ?? '';
        this.color = data?.color ?? '';
        this.amount = data?.amount ?? 0;
    }
    
}
