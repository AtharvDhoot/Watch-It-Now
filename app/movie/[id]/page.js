"use client";

import { FilmImageAndVideo } from "@/components/FilmImageAndVideo";
import Loading from "@/components/Loading";
import { fetcher } from "@/utils";
import useSWR from "swr";

export default function Movie({ params }) {
  const { id } = params;
  const { data: movie, error: movieError } = useSWR(
    `/api/movie/${id}`,
    fetcher
  );

  if (movieError) return <div>{movieError}</div>;
  if (!movie) return <div>{movieError}</div>;

  const officialTrailerKey = movie.videos.results.find(
    (item) => (item.type === "Trailer") & item.official
  );

  return (
    <>
      {movie ? (
        <div className="bg-base-100">
          <div className="container mx-auto min-h-[84vh]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <FilmImageAndVideo
                src={movie.detail.poster_path}
                title={movie.detail.title}
                videos={movie.videos}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
