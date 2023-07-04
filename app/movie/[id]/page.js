"use client";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LinkIcon from "@mui/icons-material/Link";
import LaunchIcon from "@mui/icons-material/Launch";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { TMDB_IMAGE_ENDPOINT, fetcher, shimmer, toBase64 } from "@/utils";
import useSWR from "swr";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";
import Loading from "@/components/Loading";
import Link from "next/link";

export default function Movie({ params }) {
  const { id } = params;
  const { data: movie, error: movieError } = useSWR(
    `/api/movie/${id}`,
    fetcher
  );
  const [image, setImage] = useState(true);

  if (movieError) return <div>{movieError}</div>;
  if (!movie) return <div>{movieError}</div>;

  const officialTrailerKey = movie?.videos?.results.find(
    (item) => (item.type === "Trailer") & item.official
  );

  let languageNames = new Intl.DisplayNames(["en"], { type: "language" });

  const handelImage = () => {
    setImage(!image);
  };

  return (
    <>
      {movie ? (
        <div className="bg-base-100">
          <div className="container mx-auto min-h-[84vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 mx-8 sm:mx-0">
              <div className="grid place-items-center">
                {image ? (
                  <Image
                    className="rounded-lg mt-16"
                    src={`${TMDB_IMAGE_ENDPOINT}/${movie?.detail?.poster_path}`}
                    alt={movie?.detail?.title}
                    width={350}
                    height={530}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(2, 2)
                    )}`}
                    unoptimized
                  />
                ) : (
                  <ReactPlayer
                    width="80%"
                    height="50%"
                    pip
                    controls={true}
                    url={`https://www.youtube.com/watch?v=${officialTrailerKey?.key}`}
                    fallback={<Loading />}
                  />
                )}
              </div>
              <div className="mt-16 text-base-content">
                <h1 className="text-5xl font-medium">{movie?.detail?.title}</h1>
                <h3 className="text-xl font-normal mt-2">
                  {movie?.detail?.tagline}
                </h3>
                <div className="flex items-center mt-4 text-2xl">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <p className="ml-2 font-bold">
                    {Number(movie?.detail?.vote_average).toFixed(1)}
                  </p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                  <p className="font-medium hover:underline cursor-pointer">
                    {movie?.detail?.vote_count} reviews
                  </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 mt-4">
                  {[
                    {
                      label: "Length",
                      value: movie?.detail?.runtime + " min",
                    },
                    {
                      label: "Language",
                      value: languageNames.of(movie?.detail?.original_language),
                    },
                    {
                      label: "Year",
                      value: String(movie?.detail?.release_date).substring(
                        0,
                        4
                      ),
                    },
                    {
                      label: "Revenue",
                      value: getRevenue(movie?.detail?.revenue),
                    },
                  ].map(({ label, value }) => (
                    <div className="grid" key={label}>
                      <div className="text-xl font-normal">{label}</div>
                      <div className="text-lg font-semibold">
                        {value}
                        {label === "Revenue" ? <AttachMoneyIcon /> : null}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid mt-6">
                  <p className="font-semibold text-2xl ">Genres</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {movie?.detail?.genres.map((item) => (
                      <div
                        className="badge badge-neutral badge-lg"
                        key={item.id}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid mt-6">
                  <p className="font-semibold text-2xl ">Synopsis</p>
                  <div className="text-sm">{movie?.detail?.overview}</div>
                </div>
                {movie?.credits?.cast.length > 0 ? (
                  <div className="grid mt-6">
                    <p className="font-semibold text-2xl ">Cast</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {movie?.credits?.cast
                        .filter((item) => item.order < 5)
                        .map((item) => (
                          <div className="badge badge-outline" key={item.id}>
                            {item.name}
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null}
                <div className="grid grid-cols-3 mt-12 gap-4 md:w-4/5 lg:w-full xl:w-4/5 pb-8">
                  {movie?.detail?.homepage ? (
                    <Link
                      className="btn"
                      href={movie?.detail?.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex place-items-center text-xs sm:text-sm gap-1 sm:gap-2">
                        Website <LinkIcon className="hidden sm:flex" />
                      </div>
                    </Link>
                  ) : null}
                  {movie?.detail?.imdb_id ? (
                    <Link
                      className="btn"
                      href={`https://www.imdb.com/title/${movie?.detail?.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex place-items-center text-xs sm:text-sm gap-1 sm:gap-2">
                        IMDB <LaunchIcon className="hidden sm:flex" />
                      </div>
                    </Link>
                  ) : null}
                  {officialTrailerKey ? (
                    <button className="btn" onClick={handelImage}>
                      <div className="flex place-items-center text-xs sm:text-sm gap-1 sm:gap-2">
                        Trailer <YouTubeIcon className="hidden sm:flex" />
                      </div>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

function getRevenue(labelValue) {
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + " Billion"
    : Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(0) + " Million"
    : Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(0) + " K"
    : Math.abs(Number(labelValue));
}
