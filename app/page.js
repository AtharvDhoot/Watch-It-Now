// const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
"use client";

import Collection from "@/components/Collection";
import Loading from "@/components/Loading";
import SearchBar from "@/components/SearchBar";
import { fetcher, pathToSearchAll } from "@/utils";
import useSWR from "swr";

// const { GoogleAuth } = require("google-auth-library");

// async function givePrompt() {
//   const MODEL_NAME = "models/text-bison-001";
//   const PALM_API_KEY = process.env.PALM_API_KEY;

//   const client = new TextServiceClient({
//     authClient: new GoogleAuth().fromAPIKey(PALM_API_KEY),
//   });

//   const prompt = "Repeat after me: one, two,";

//   return await client.generateText({
//     model: MODEL_NAME,
//     prompt: {
//       text: prompt,
//     },
//   });
// }

export default function Home() {
  // const data = await givePrompt();
  // console.log(data[0].candidates[0].output);
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
            <Collection
              isHomePage
              endpoint="/api/movie/popular/1?isFirst=true"
              href="/movie/popular/1"
              limit={limitNormal}
              title="Popular"
              media_type="movie"
              type="movie"
              genreMovieList={movieGenreList}
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
