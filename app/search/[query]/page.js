import { Suspense } from "react";

import { pathToSearchAll } from "@/utils";
import CollectionSearch from "@/components/CollectionSearch";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import Toast from "@/components/Toast";

async function getCurrentSearchPage(query, page) {
  const response = await fetch(
    process.env.BASE_URL + `/api/search/${query}?page=${page}`,
    { next: { revalidate: 600 } }
  );
  const data = await response.json();
  return data;
}

export default async function Search({ params, searchParams }) {
  const { query } = params;
  const page = searchParams.page;
  const data = await getCurrentSearchPage(query, page);
  const currentPage = Number(page);
  const isFirst = currentPage === 1;
  const isLast = data ? currentPage === data.total_pages : false;
  const filteredResults = data
    ? data.results.filter((item) => item.media_type !== "person")
    : [];

  return (
    <>
      <Suspense>
        {data ? (
          <>
            <main className="bg-base-100">
              <div className="container mx-auto min-h-[84vh]">
                <Toast />
                <CollectionSearch
                  arr={filteredResults}
                  searchTerm={query}
                  totalResult={data.total_results}
                />
                <Pagination
                  currentPage={currentPage}
                  prevHref={`${pathToSearchAll}${query}?page=${
                    currentPage - 1
                  }`}
                  nextHref={`${pathToSearchAll}${query}?page=${
                    currentPage + 1
                  }`}
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
      </Suspense>
    </>
  );
}
