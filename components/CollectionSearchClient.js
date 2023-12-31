"use client";

import useSWR from "swr";

import { fetcher, renderResults, sliceArray } from "../utils";
import CardNormal from "./CardNormal";

export default function CollectionSearchClient({
  arr = [],
  limit = 20,
  media_type,
  searchTerm,
  totalResult,
}) {
  const { data: genreMovieList, errorMovie } = useSWR(
    "/api/genre/movie/list",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { data: genreTVList, errorTv } = useSWR("/api/genre/tv/list", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const officialTrailerKey = arr.map((item) => {
    const v = item?.videos?.results.find(
      (video) => video.type === "Trailer" && video.official
    );
    if (!v) {
      return true;
    }
    return { id: item.id, video: v };
  });
  return (
    <>
      {searchTerm ? (
        <h1 className="flex w-full place-content-center font-bold text-4xl mb-4">
          {`Found ${totalResult} results for '${decodeURIComponent(
            searchTerm
          )}'`}
        </h1>
      ) : null}
      {genreMovieList && genreTVList ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between mx-6 sm:mx-0 gap-4">
          {renderResults(
            sliceArray(arr, limit),
            CardNormal,
            media_type,
            genreMovieList,
            genreTVList,
            officialTrailerKey
          )}
        </section>
      ) : null}
    </>
  );
}
