import { BeanAmount, BeanType } from "./bean/BeanList";
import { GameText } from "./controls/GameText";
import { WikiType } from "./wiki/Wiki";

export default class GameHelper {

    public static listString(str: string[], conjunction: string = 'or'): string {
        if (str.length === 1) {
            return str[0];
        }
        const firsts = str.slice(0, str.length - 1);
        const last = str[str.length - 1];
        return `${firsts.join(', ')} ${conjunction} ${last}`;
    }

    public static gameTextList(gameTexts: GameText[][], conjunction: string = 'or'): GameText[] {
        if (gameTexts.length === 1) {
            return gameTexts[0];
        }

        const firsts = gameTexts.slice(0, gameTexts.length - 1);
        const last = gameTexts[gameTexts.length - 1];
        const gameText: GameText[] = [];
        for (const text of firsts) {
            gameText.push(...text);
            gameText.push(', ');
        }
        gameText.push(`${conjunction} `);
        gameText.push(...last);

        return gameText;
    }

    public static beanAmount(beans: BeanAmount, conjunction: string = '<br>'): GameText[] {
        const gameText: GameText[] = [];

        for (const bean in beans) {
            const amount = beans[bean as BeanType] ?? 0;
            gameText.push(`${amount} `);
            gameText.push({text: `${bean}${amount > 1 ? 's' : ''}`, type: WikiType.Bean, id: bean});
            gameText.push(conjunction);
        }
        
        // Removing last BR
        gameText.pop();
        
        return gameText;
    }

    public static enumNumbers(enumerable: any): number[] {
        return Object.keys(enumerable).map(Number).filter((k) => !Number.isNaN(k));
    }
    
    public static importImages(r: __WebpackModuleApi.RequireContext) {
        const images: {[key: string]: any} = {};
        r.keys().map((item, index) => { 
            const name = item.replace('./', '').replace('.png', '');
            return images[name] = r(item); 
        });
        return images;
    }

}