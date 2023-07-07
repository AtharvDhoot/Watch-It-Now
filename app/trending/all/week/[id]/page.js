import { Suspense } from "react";

import CollectionSearch from "@/components/CollectionSearch";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";

export const metadata = {
  title: "Weekly Trending Page | Watch It Now",
  description: "Weekly Trending Titles",
};

async function getCurrentPage(currentPage) {
  const response = await fetch(
    process.env.BASE_URL + `/api/trending/all/week/${currentPage}`,
    { next: { revalidate: 600 } }
  );
  const data = await response.json();
  return data;
}

export default async function TrendingAllWeek({ params }) {
  const { id } = params;
  const currentPage = Number(id);
  const data = await getCurrentPage(currentPage);
  const isFirst = currentPage === 1;
  const isLast = data ? currentPage === data.total_pages : false;
  return (
    <>
      <Suspense>
        <main className="bg-base-100">
          <div className="container mx-auto">
            {data ? (
              <>
                <h1 className="flex w-full place-content-center font-bold text-4xl mb-4">
                  Trending weekly
                </h1>
                <CollectionSearch isGenre arr={data.results} />
                <Pagination
                  currentPage={currentPage}
                  prevHref={`/trending/all/week/${currentPage - 1}`}
                  nextHref={`/trending/all/week/${currentPage + 1}`}
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
      </Suspense>
    </>
  );
}
