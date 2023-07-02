"use client";

import CollectionSearch from "@/components/CollectionSearch";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { fetcher, pathToSearchAll } from "@/utils";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function Search({ params }) {
  const { query } = params;
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { data, error } = useSWR(`/api/search/${query}?page=${page}`, fetcher);

  const currentPage = Number(page);
  const isFirst = currentPage === 1;
  const isLast = data ? currentPage === data.total_pages : false;
  const filteredResults = data
    ? data.results.filter((item) => item.media_type !== "person")
    : [];
  const { data: movieGenreList, errorMovie } = useSWR(
    "/api/genre/movie/list",
    fetcher
  );
  const { data: tvGenreList, errorTv } = useSWR("/api/genre/tv/list", fetcher);
  return (
    <>
      {data && movieGenreList && tvGenreList ? (
        <>
          <main className="bg-base-100">
            <div className="container mx-auto">
              <CollectionSearch
                arr={filteredResults}
                searchTerm={query}
                totalResult={data.total_results}
                genreMovieList={movieGenreList}
                genreTVList={tvGenreList}
              />
              <Pagination
                currentPage={currentPage}
                prevHref={`${pathToSearchAll}${query}?page=${currentPage - 1}`}
                nextHref={`${pathToSearchAll}${query}?page=${currentPage + 1}`}
                isFirst={isFirst}
                isLast={isLast}
                totalPages={data.total_pages}
              />
            </div>
          </main>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
