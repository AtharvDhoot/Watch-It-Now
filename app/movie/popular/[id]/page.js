"use client";

import CollectionSearch from "@/components/CollectionSearch";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { fetcher } from "@/utils";
import useSWR from "swr";

export default function PopularMovies({ params }) {
  const { id } = params;
  const currentPage = Number(id);
  const { data, error } = useSWR(`/api/movie/popular/${currentPage}`, fetcher);
  const isFirst = currentPage === 1;
  const isLast = data ? currentPage === data.total_pages : false;
  const { data: movieGenreList, errorMovie } = useSWR(
    "/api/genre/movie/list",
    fetcher
  );
  return (
    <>
      <main className="bg-base-100">
        <div className="container mx-auto">
          {data && movieGenreList ? (
            <>
              <h1 className="flex w-full place-content-center font-bold text-4xl mb-4">
                Popular Movies
              </h1>
              <CollectionSearch
                arr={data.results}
                genreMovieList={movieGenreList}
                media_type="movie"
              />
              <Pagination
                currentPage={currentPage}
                prevHref={`/movie/popular/${currentPage - 1}`}
                nextHref={`/movie/popular/${currentPage + 1}`}
                isFirst={isFirst}
                isLast={isLast}
                totalPages={data.total_pages}
              />
            </>
          ) : (
            <Loading />
          )}
        </div>
      </main>
    </>
  );
}
