"use client";

import Collection from "@/components/Collection";
import Loading from "@/components/Loading";
import SearchBar from "@/components/SearchBar";
import { fetcher, pathToSearchAll } from "@/utils";
import { ToastContainer } from "react-toastify";
import useSWR from "swr";

export default function Home() {
  const w = window.innerWidth;
  const limitNormal = w <= "639" ? 4 : 8;
  const { data: movieGenreList, errorMovie } = useSWR(
    "/api/genre/movie/list",
    fetcher
  );
  const { data: tvGenreList, errorTv } = useSWR("/api/genre/tv/list", fetcher);

  if (errorMovie || errorTv) return <div>Error occurred</div>;

  return (
    <>
      {movieGenreList && tvGenreList ? (
        <main className="bg-base-100">
          <div className="container mx-auto min-h-screen">
            <div className="flex md:hidden mb-4 mx-4 pt-2">
              <SearchBar searchPath={pathToSearchAll} />
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar
              theme={
                localStorage.getItem("theme") === "night" ? "dark" : "light"
              }
              limit={1}
            />
            <Collection
              isHomePage
              endpoint="/api/movie/popular/1?isFirst=true"
              href="/movie/popular/1"
              limit={limitNormal}
              title="Popular"
              media_type="movie"
              type="movie"
              genreMovieList={movieGenreList}
              genreTVList={tvGenreList}
            />
            <div className="divider"></div>
            <Collection
              isHomePage
              endpoint="/api/tv/popular/1?isFirst=true"
              href="/tv/popular/1"
              limit={limitNormal}
              title="Popular"
              media_type="tv"
              type="tv"
              genreMovieList={movieGenreList}
              genreTVList={tvGenreList}
            />
            <div className="divider"></div>
            <Collection
              isHomePage
              endpoint="/api/trending/all/day/1?isFirst=true"
              href="/trending/all/day/1"
              limit={limitNormal}
              title="Trending"
              type="Day"
              genreMovieList={movieGenreList}
              genreTVList={tvGenreList}
            />
            <div className="divider"></div>
            <Collection
              isHomePage
              endpoint="/api/trending/all/week/1?isFirst=true"
              href="/trending/all/week/1"
              limit={limitNormal}
              title="Trending"
              type="Week"
              genreMovieList={movieGenreList}
              genreTVList={tvGenreList}
            />
            <div className="pb-8"></div>
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
