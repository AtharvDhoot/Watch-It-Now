"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";

import GenreGrid from "./GenreGrid";

import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Loading from "./Loading";

export default function SuggestionFilter() {
  const [selectedOption, setSelectedOption] = useState(null);
  const animatedComponents = makeAnimated();
  let { data: movieGenreList, errorMovie } = useSWR(
    "/api/genre/movie/list",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  let { data: tvGenreList, errorTv } = useSWR("/api/genre/tv/list", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  movieGenreList =
    movieGenreList && movieGenreList.genres.map((item) => item.name);
  tvGenreList = tvGenreList && tvGenreList.genres.map((item) => item.name);

  const allGenres = movieGenreList &&
    tvGenreList && [...new Set([...movieGenreList, ...tvGenreList])];
  const handleSubmit = (event) => {
    event.preventDefault();
    const genreSelectedMd = event.target.elements.genre_selected_grid.value;
    const genreSelectedSm = event.target.elements.genre_selected_multi.value;
    const contentType = event.target.elements.content_type.value;
  };

  return allGenres ? (
    <div>
      <h3 className="mt-8 text-normal text-center md:text-left md:text-xl md:ml-14">
        Don&apos;t know what you are looking for? We got you
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <h4 className="text-lg ml-14 mt-4 hidden md:block">
            Select genre(s)
          </h4>
          <GenreGrid allGenres={allGenres} />
          <div className="grid place-items-center mt-8 md:hidden">
            {selectedOption && (
              <input
                readOnly
                className="hidden"
                value={selectedOption.map((item) => item.value)}
                id="genre_selected_multi"
              />
            )}
            <Select
              defaultValue={selectedOption}
              components={animatedComponents}
              onChange={setSelectedOption}
              options={allGenres.map((item) => {
                return { value: item, label: item };
              })}
              isMulti
              className="w-3/4 ml-6"
              classNames={{
                control: () => "bg-base-100 border-black rounded-lg p-2",
                menu: () => "bg-base-100",
                option: () => "bg-base-100 hover:bg-base-200",
                multiValue: () => "badge badge-outline",
                multiValueLabel: () => "text-base-content",
              }}
              closeMenuOnSelect={false}
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg ml-14 mt-4 hidden md:block">
            Select content type to recommend
          </h4>
          <div className="grid place-items-center md:place-items-start mt-4">
            <select
              className="select select-bordered w-3/4 ml-6 md:ml-12"
              id="content_type"
            >
              <option>Both(Movies and TV Series)</option>
              <option>Movie</option>
              <option>TV Series</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn w-full btn-outline mt-8 max-w-[180px] md:max-w-xs mb-10"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  ) : (
    <Loading />
  );
}
