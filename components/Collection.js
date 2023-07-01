"use client";

import useSWR from "swr";
import { fetcher, renderResults, sliceArray } from "../utils";
import CardNormal from "./CardNormal";
import Heading from "./Heading";
import Loading from "./Loading";

export default function Collection({
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
  const { data, error } = useSWR(endpoint, fetcher);
  console.log(title, data);
  if (error) return <div>Error occurred</div>;

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
          <div className="w-full flex flex-col items-center gap-4 sm:gap-x-7 sm:gap-y-6 xl:gap-x-10 xl:gap-y-8 sm:flex-row sm:flex-wrap sm:justify-between">
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
