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

export const APIs = {
    ANIME: (title: string) => `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}`,
    MOVIE: "https://api.themoviedb.org/3/search/movie",
    THANOS: "https://thanosapi.herokuapp.com/random/",
    WAIFU: `https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100000)}.jpg`,
    XKCD: "http://xkcd.com/info.0.json",
    IMGUR: (subreddit: string) => `https://imgur.com/r/${subreddit}/hot.json`,
    ANIMAL: (type: string) => `https://some-random-api.ml/img/${type}`,
};

export const COLORS = {
    BLACK: 0x000000,
    WHITE: 0xffffff,
    GREEN: 0x2ECC71,
    RED: 0xE74C3C,
};