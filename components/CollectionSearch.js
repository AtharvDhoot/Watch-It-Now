import { renderResults, sliceArray } from "../utils";
import CardNormal from "./CardNormal";

async function getGenres() {
  const movieGenreList = await fetch(
    process.env.BASE_URL + "/api/genre/movie/list"
  );
  const tvGenreList = await fetch(process.env.BASE_URL + "/api/genre/tv/list");
  return {
    movieGenreList: await movieGenreList.json(),
    tvGenreList: await tvGenreList.json(),
  };
}

export default async function CollectionSearch({
  arr = [],
  limit = 20,
  media_type,
  searchTerm,
  totalResult,
}) {
  const { movieGenreList, tvGenreList } = await getGenres();

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
      {movieGenreList && tvGenreList ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between mx-6 sm:mx-0 gap-4">
          {renderResults(
            sliceArray(arr, limit),
            CardNormal,
            media_type,
            movieGenreList,
            tvGenreList,
            officialTrailerKey
          )}
        </section>
      ) : null}
    </>
  );
}
