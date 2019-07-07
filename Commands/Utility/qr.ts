import { Command, Penelope, EMBED_COLOR as color, oneLineTrim, Util } from "../..";
import { Message, EmbedBase } from "eris";

export default class extends Command {

    constructor(client: Penelope) {
        super(client, {
            name: "qr",
            description: "Convert any content to a QR code.",
            category: "🛠 Utility",
            aliases: ["qr-code"],
            usage: "<content>"
        });
    }

    async exec(message: Message, ...content: string[]) {

        if (!content.length) throw "You must specify content to make a code with!";
        const url = oneLineTrim`
            https://api.qrserver.com/v1/create-qr-code
            ?margin=20px
            &color=${Number(color).toString(16)}
            &bgcolor=34363B
            &data=${encodeURIComponent(content.join(" "))}
        `;

        return message.channel.createMessage({ embed: {
            color, image: { url },
            footer: Util.genericFooter(message.author)
        } });

    }

}