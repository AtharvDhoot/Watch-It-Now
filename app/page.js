// const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
"use client";

import Collection from "@/components/Collection";
import Loading from "@/components/Loading";
import { fetcher } from "@/utils";
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
  const limitNormal = 8;
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
            <Collection
              isHomePage
              endpoint="/api/movie/popular/1"
              href="/movie/popular/1"
              limit={limitNormal}
              title="Popular"
              media_type="movie"
              type="movie"
              genreList={movieGenreList}
            />
            <div className="divider"></div>
            <Collection
              isHomePage
              endpoint="/api/tv/popular/1"
              href="/tv/popular/1"
              limit={limitNormal}
              title="Popular"
              media_type="tv"
              type="tv"
              genreList={tvGenreList}
            />
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
