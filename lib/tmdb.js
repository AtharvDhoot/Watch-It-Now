import { TMDB_API_KEY, TMDB_ENDPOINT } from "@/utils";

export function getUrl(endpoint, page) {
  return `${TMDB_ENDPOINT}/${endpoint}?api_key=${TMDB_API_KEY}&page=${page}`;
}

export function getGenre(endpoint) {
  return `${TMDB_ENDPOINT}/${endpoint}?api_key=${TMDB_API_KEY}`;
}

// Trending
export const trendingAllDay = "trending/all/day";
export const trendingAllWeek = "trending/all/week";

// Movie
export const moviePopular = "movie/popular";
export const movieTopRated = "movie/top_rated";

// TV
export const tvPopular = "tv/popular";
export const tvTopRated = "tv/top_rated";

// Genre
export const genreMovie = "genre/movie/list";
export const genreTV = "genre/tv/list";
