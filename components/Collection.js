import { renderResults, sliceArray } from "../utils";
import CardNormal from "./CardNormal";
import Heading from "./Heading";
import Loading from "./Loading";

async function getMovies(endpoint) {
  const response = await fetch(process.env.BASE_URL + endpoint, {
    next: { revalidate: 86400 },
  });
  const data = await response.json();
  return data;
}

export default async function Collection({
  Component = CardNormal,
  endpoint,
  href,
  isHomePage,
  limit = 8,
  media_type,
  title,
  type,
  genreMovieList,
  genreTVList,
}) {
  const data = await getMovies(endpoint);

  const officialTrailerKey = data?.videos
    ? data.videos.map((item) => {
        const v = item.results.find(
          (video) => video.type === "Trailer" && video.official
        );
        return { id: item.id, video: v };
      })
    : true;

  return (
    <>
      {data && officialTrailerKey ? (
        <div>
          <Heading
            title={title}
            href={href}
            isHomePage={isHomePage}
            media_type={type}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-4 mx-6 sm:mx-0">
            {renderResults(
              sliceArray(data.results || [], limit),
              Component,
              media_type,
              genreMovieList,
              genreTVList,
              officialTrailerKey
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
