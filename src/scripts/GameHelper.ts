
export default class GameHelper {

    public static listString(str: string[], conjunction: string = 'or'): string {
        if (str.length === 1) {
            return str[0];
        }
        const firsts = str.slice(0, str.length - 1);
        const last = str[str.length - 1];
        return `${firsts.join(', ')} ${conjunction} ${last}`;
    }

}