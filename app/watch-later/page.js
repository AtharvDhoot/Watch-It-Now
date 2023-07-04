"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";
import Loading from "@/components/Loading";
import CollectionSearch from "@/components/CollectionSearch";

export default function WatchLater() {
  const movieIds = encodeURIComponent(
    localStorage.getItem("watch-later-movies")
  );
  const tvIds = encodeURIComponent(localStorage.getItem("watch-later-tv"));
  const url = `/api/watch-later?movieIds=${movieIds}&tvIds=${tvIds}`;
  const { data, error } = useSWR(url, fetcher);

  return (
    <>
      {data ? (
        <main className="bg-base-100">
          <div className="container mx-auto min-h-screen">
            <div className="text-2xl font-medium tracking-wider ml-1.5 mb-2">
              Bookmarked Movies
            </div>
            {data.movieResults.length > 0 ? (
              <CollectionSearch arr={data.movieResults} media_type="movie" />
            ) : (
              <div className="font-medium tracking-wider ml-1.5 mb-2">
                Add movies by clicking on the plus icon!
              </div>
            )}
            <div className="text-2xl font-medium tracking-wider ml-1.5 mb-2">
              Bookmarked TV Series
            </div>
            {data.tvResults.length > 0 ? (
              <CollectionSearch arr={data.tvResults} media_type="tv" />
            ) : (
              <div className="font-medium tracking-wider ml-1.5 mb-2">
                Add tv series by clicking on the plus icon!
              </div>
            )}
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
