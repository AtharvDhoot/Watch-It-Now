"use client";

import { useRef, useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import SearchIcon from "@mui/icons-material/Search";
import useSWR from "swr";
import { fetcher } from "@/utils";

import CollectionSearchClient from "@/components/CollectionSearchClient";
import GenreGrid from "./GenreGrid";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

async function getSearchResults(query, contentType, isFilter) {
  const response = await fetch(
    `/api/palm/${query}?contentType=${contentType}&isFilter=${isFilter}`
  );
  const data = response.json();
  return data;
}

async function getSearchResultData(titles) {
  const response = await fetch(`/api/multi/${titles}`);
  const data = response.json();
  return data;
}

export default function SuggestionPageSearch() {
  if (
    typeof window !== "undefined" &&
    new Date().getTime() - localStorage.getItem("expireIn") >
      24 * 60 * 60 * 1000
  ) {
    localStorage.setItem("count", 0);
    localStorage.removeItem("expireIn");
  }
  const [query, setQuery] = useState("");

  const [searchRes, setSearchRes] = useState(null);
  const [showRes, setShowRes] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [suggestionCount, setSuggestionCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const animatedComponents = makeAnimated();

  const router = useRouter();

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

  const handleOnFocus = (e) => {
    e.target.setAttribute(
      "placeholder",
      "City of God, The Godfather, Goodfellas"
    );
  };
  const handleOnBlur = (e) => {
    e.target.setAttribute(
      "placeholder",
      "Tell us movies, tv series that you like"
    );
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (query.length === 0) {
      return;
    } else {
      setShowRes(false);
      const nextCount = suggestionCount + 1;
      setSuggestionCount(nextCount);
      if (typeof window !== "undefined") {
        if (nextCount === 1) {
          localStorage.setItem("expireIn", new Date().getTime());
        }
        localStorage.setItem("count", nextCount);
        if (localStorage.getItem("count") > 10) {
          window.my_modal_1.showModal();
          return;
        }
      }
      setSubmitted(true);
      const data = await getSearchResults(query, "Movies or TV Series", false);
      const ai_response = data.response
        .split("\n")
        .map((item) => item.replaceAll("*", "").trim());
      const titlesRecommended = await getSearchResultData(ai_response);
      setShowRes(true);
      setSearchRes(titlesRecommended);
    }
  };

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    setShowRes(false);
    const genreSelectedMd = event.target.elements.genre_selected_grid.value;
    const genreSelectedSm = event.target.elements?.genre_selected_multi?.value;
    const contentType = event.target.elements.content_type.value;
    const nextCount = suggestionCount + 1;
    setSuggestionCount(nextCount);
    if (typeof window !== "undefined") {
      if (nextCount === 1) {
        localStorage.setItem("expireIn", new Date().getTime());
      }
      localStorage.setItem("count", nextCount);
      if (localStorage.getItem("count") > 10) {
        window.my_modal_1.showModal();
        return;
      }
    }
    setSubmitted(true);
    const data = await getSearchResults(
      genreSelectedMd.length > 0 ? genreSelectedMd : genreSelectedSm,
      contentType,
      true
    );
    const ai_response = data.response
      .split("\n")
      .map((item) => item.replaceAll("*", "").trim());
    const titlesRecommended = await getSearchResultData(ai_response);
    setShowRes(true);
    setSearchRes(titlesRecommended);
  };

  const handleResultClick = () => {
    router.push("/#results");
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Wait a moment!</h3>
          <p className="py-4">
            You have already used AI recommendations for 10 times. Please come
            back tomorrow.
          </p>
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
      <div className="grid place-items-center mt-8">
        <div className="w-3/4 md:w-1/2">
          <form onSubmit={handleOnSubmit}>
            <div className="flex grow place-items-center">
              <SearchIcon />
              <input
                className={`form input w-full input-bordered input-primary focus:outline-none`}
                type="text"
                placeholder={"Tell us movies, tv series that you like"}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn w-full btn-outline mt-8 max-w-[180px] md:max-w-xs"
                onClick={handleResultClick}
              >
                Submit Search
              </button>
            </div>
          </form>
        </div>
      </div>
      {allGenres ? (
        <div>
          <h3 className="mt-8 text-normal text-center md:text-left md:text-xl md:ml-14">
            Don&apos;t know what you are looking for? We got you
          </h3>
          <form onSubmit={handleFilterSubmit}>
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
                  <option>Movies or TV Series</option>
                  <option>Movies</option>
                  <option>TV Series</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn w-full btn-outline mt-8 max-w-[180px] md:max-w-xs mb-10"
                onClick={handleResultClick}
              >
                Submit Filters
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Loading />
      )}
      <div id="results">
        {submitted &&
          (showRes ? (
            <div className="mt-4 pb-8">
              <div className="flex w-full place-content-center font-bold text-4xl mb-4">
                Here are the Recommendations
              </div>
              {searchRes.results.length > 0 ? (
                <CollectionSearchClient arr={searchRes.results} />
              ) : (
                <div>Can&apos;t find any recommendations. Please try again</div>
              )}
            </div>
          ) : (
            <Loading />
          ))}
      </div>
    </div>
  );
}
