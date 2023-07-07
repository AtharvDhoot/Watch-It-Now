import { pathToSearchAll } from "@/utils";
import Collection from "@/components/Collection";
import Loading from "@/components/Loading";
import SearchBar from "@/components/SearchBar";
import Toast from "@/components/Toast";

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

export default async function Home() {
  let limitNormal = 8;
  if (typeof window !== "undefined") {
    const w = window.innerWidth;
    limitNormal = w <= "639" ? 4 : 8;
  }
  const { movieGenreList, tvGenreList } = await getGenres();

  return (
    <>
      {movieGenreList && tvGenreList ? (
        <main className="bg-base-100">
          <div className="container mx-auto min-h-screen">
            <div className="flex md:hidden mb-4 mx-4 pt-2">
              <SearchBar searchPath={pathToSearchAll} />
            </div>
            <Toast />
            <Collection
              isHomePage
              endpoint="/api/movie/popular/1?isFirst=true"
              href="/movie/popular/1"
              limit={limitNormal}
              title="Popular"
              media_type="movie"
              type="movie"
              genreMovieList={movieGenreList}
              genreTVList={tvGenreList}
            />
            <div className="divider"></div>
            <Collection
              isHomePage
              endpoint="/api/tv/popular/1?isFirst=true"
              href="/tv/popular/1"
              limit={limitNormal}
              title="Popular"
              media_type="tv"
              type="tv"
              genreMovieList={movieGenreList}
              genreTVList={tvGenreList}
            />
            <div className="divider"></div>
            <Collection
              isHomePage
              endpoint="/api/trending/all/day/1?isFirst=true"
              href="/trending/all/day/1"
              limit={limitNormal}
              title="Trending"
              type="Today"
              genreMovieList={movieGenreList}
              genreTVList={tvGenreList}
            />
            <div className="divider"></div>
            <Collection
              isHomePage
              endpoint="/api/trending/all/week/1?isFirst=true"
              href="/trending/all/week/1"
              limit={limitNormal}
              title="Trending"
              type="Weekly"
              genreMovieList={movieGenreList}
              genreTVList={tvGenreList}
            />
            <div className="pb-8"></div>
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
