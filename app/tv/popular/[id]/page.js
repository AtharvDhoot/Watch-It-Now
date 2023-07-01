"use client";

import CollectionSearch from "@/components/CollectionSearch";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { fetcher } from "@/utils";
import useSWR from "swr";

export default function PopularTVSeries({ params }) {
  const { id } = params;
  const currentPage = Number(id);
  const { data, error } = useSWR(`/api/tv/popular/${currentPage}`, fetcher);
  const isFirst = currentPage === 1;
  const isLast = data ? currentPage === data.total_pages : false;
  const { data: tvGenreList, errorMovie } = useSWR(
    "/api/genre/tv/list",
    fetcher
  );

  return (
    <>
      <main className="bg-base-100">
        <div className="container mx-auto">
          {data && tvGenreList ? (
            <>
              <h1 className="flex w-full place-content-center font-bold text-4xl mb-4">
                Popular TV Series
              </h1>
              <CollectionSearch
                arr={data.results}
                genreTVList={tvGenreList}
                media_type="tv"
              />
              <Pagination
                currentPage={currentPage}
                prevHref={`/tv/popular/${currentPage - 1}`}
                nextHref={`/tv/popular/${currentPage + 1}`}
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
