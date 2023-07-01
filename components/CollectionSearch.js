import { renderResults, sliceArray } from "../utils";
import CardNormal from "./CardNormal";

export default function CollectionSearch({
  arr = [],
  limit = 20,
  media_type,
  genreMovieList,
  genreTVList,
}) {
  return (
    <>
      <section className="w-full flex flex-col items-center gap-4 sm:gap-x-7 sm:gap-y-6 xl:gap-x-10 xl:gap-y-8 sm:flex-row sm:flex-wrap sm:justify-between">
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
