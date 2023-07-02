import { renderResults, sliceArray } from "../utils";
import CardNormal from "./CardNormal";

export default function CollectionSearch({
  arr = [],
  limit = 20,
  media_type,
  genreMovieList,
  genreTVList,
  searchTerm,
  totalResult,
}) {
  return (
    <>
      {searchTerm ? (
        <h1 className="flex w-full place-content-center font-bold text-4xl mb-4">
          {`Found ${totalResult} results for '${searchTerm}'`}
        </h1>
      ) : null}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between mx-6 sm:mx-0 gap-4">
        {renderResults(
          sliceArray(arr, limit),
          CardNormal,
          media_type,
          genreMovieList,
          genreTVList
        )}
      </section>
    </>
  );
}
