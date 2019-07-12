import { Command, Penelope, APIs, fetch as $, EMBED_COLOR as color, stripIndents, Util } from "../..";
import { Message } from "eris";
import moment from "moment";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "stock",
            description: "Retrieve info about a stock symbol.",
            category: "🧠 Knowledge",
            usage: "<symbol>"
        });
    }

    async exec(message: Message, company: string) {

        if (!company) throw "You must specify a stock symbol!";
        const {
            latestPrice: price, changePercent: percent, change,
            companyName: name, symbol, ...quote
        } = await $(APIs.IEX(company))
            .then(res => res.json())
            .catch(() => { throw "I can't find a stock symbol by that name!" });

        return message.channel.createMessage({ embed: {
            color, thumbnail: { url: `https://storage.googleapis.com/iex/api/logos/${symbol}.png` },
            footer: Util.genericFooter(message.author),
            description: stripIndents`
                **__[${name}](https://finance.yahoo.com/quote/${symbol})__** ${price} USD ${change} (${(percent * 100).toFixed(2)}%)
                Closed **${moment(quote.closeTime).from(new Date())}**.
            `,
            fields: [{
                name: "Open",
                value: String(quote.open),
                inline: true
            }, {
                name: "P/E Ratio",
                value: String(quote.peRatio),
                inline: true
            }, {
                name: "High",
                value: String(quote.high),
                inline: true
            }, {
                name: "Prev Close",
                value: String(quote.previousClose),
                inline: true
            }, {
                name: "Low",
                value: String(quote.low),
                inline: true
            }, {
                name: "52-wk High",
                value: String(quote.week52High),
                inline: true
            }, {
                name: "Mkt Cap",
                value: this.parseNum(quote.marketCap),
                inline: true
            }, {
                name: "52-wk Low",
                value: String(quote.week52Low),
                inline: true
            }]
        } });

    }

    private parseNum(value: number): string {

        const suffixes = ["", "K", "M", "B", "T"];
        let new_value: number|string = value,
            suffix_num = 0;
        
        while (new_value >= 1000) {
            new_value /= 1000;
            suffix_num++;
        }

        new_value = new_value.toPrecision(2);
        new_value += suffixes[suffix_num];

        return new_value;

    }

}