import { TMDB_API_KEY, TMDB_ENDPOINT } from "@/utils";

export function getUrl(endpoint, page) {
  return `${TMDB_ENDPOINT}/${endpoint}?api_key=${TMDB_API_KEY}&page=${page}`;
}

export function getGenre(endpoint) {
  return `${TMDB_ENDPOINT}/${endpoint}?api_key=${TMDB_API_KEY}`;
}

export function getMovieDetail(id) {
  return `${TMDB_ENDPOINT}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`;
}

export function getTvDetail(id) {
  return `${TMDB_ENDPOINT}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`;
}

export function getMovieVideos(id) {
  return `${TMDB_ENDPOINT}/movie/${id}/videos?api_key=${TMDB_API_KEY}`;
}

export function getTvVideos(id) {
  return `${TMDB_ENDPOINT}/tv/${id}/videos?api_key=${TMDB_API_KEY}`;
}

export function search(query, page) {
  return `${TMDB_ENDPOINT}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query
  )}&page=${page}`;
}

// Trending
export const trending = "trending/all/";

// Movie
export const moviePopular = "movie/popular";
export const movieTopRated = "movie/top_rated";

// TV
export const tvPopular = "tv/popular";
export const tvTopRated = "tv/top_rated";

// Genre
export const genreMovie = "genre/movie/list";
export const genreTV = "genre/tv/list";
