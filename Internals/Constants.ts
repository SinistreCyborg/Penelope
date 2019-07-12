export const EMBED_COLOR = 12413569;

export const PERMS: { [key: string]: number } = {
    READ_MESSAGES: 1024,
    SEND_MESSAGES: 2048,
    EMBED_LINKS: 16384,
    ATTACH_FILES: 32768,
    READ_MESSAGE_HISTORY: 65536,
    ADD_REACTIONS: 64,
    MANAGE_SERVER: 32
};

import { readFileSync } from "fs";
import path from "path";
import yaml from "js-yaml";

export const settings = yaml.safeLoad(readFileSync(path.join(process.cwd(), "settings.yml"), "utf-8"));

export const APIs = {
    ANIME: (title: string) => `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}`,
    MOVIE: (query: string) => `https://api.themoviedb.org/3/search/movie?api_key=${settings.keys.TMDB}&query=${query}`,
    THANOS: "https://thanosapi.herokuapp.com/random/",
    WAIFU: `https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100000)}.jpg`,
    XKCD: "http://xkcd.com/info.0.json",
    IMGUR: (subreddit: string) => `https://imgur.com/r/${subreddit}/hot.json`,
    ANIMAL: (type: string) => `https://some-random-api.ml/img/${type}`,
    WIKI: (query: string) => `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
    ITUNES: (query: string, nsfw: boolean) => `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=1&nsfw=${nsfw ? "yes" : "no"}`,
    WEBSTER: (word: string) => `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${settings.keys.WEBSTER}`,
    IEX: (symbol: string) => `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${settings.keys.IEX_CLOUD}`,
    SHIBA: "https://shibe.online/api/shibes",
};

export const COLORS = {
    BLACK: 0x000000,
    WHITE: 0xffffff,
    GREEN: 0x2ECC71,
    RED: 0xE74C3C,
    ORANGE: 0xE67E22,
};

export const REGION_EMOJIS: { [key: string]: any } = {
    "us-east": "🇺🇸",
    "us-central": "🇺🇸",
    "us-west": "🇺🇸",
    "us-south": "🇺🇸",
    "eu-west": "🇪🇺",
    "eu-central": "🇪🇺",
    "frankfurt": "🇩🇪",
    "amsterdam": "🇳🇱",
    "russia": "🇷🇺",
    "london": "🇬🇧",
    "sydney": "🇦🇺",
    "singapore": "🇸🇬",
    "hongkong": "🇭🇰",
    "japan": "🇯🇵",
    "india": "🇮🇳",
    "brazil": "🇧🇷",
    "southafrica": "🇿🇦"
};