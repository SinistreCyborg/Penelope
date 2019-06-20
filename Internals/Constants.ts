export const EMBED_COLOR = 12413569;

export const APIs = {
    ANIME: (title: string) => `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}`,
    MOVIE: "https://api.themoviedb.org/3/search/movie",
    THANOS: "https://thanosapi.herokuapp.com/random/",
    WAIFU: `https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100000)}.jpg`,
    XKCD: "http://xkcd.com/info.0.json",
    IMGUR: (subreddit: string) => `https://imgur.com/r/${subreddit}/hot.json`,
};