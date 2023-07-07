"use client";

import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import { search } from "@/lib/tmdb";
import CollectionSearchClient from "@/components/CollectionSearchClient";
import Loading from "@/components/Loading";

async function getSearchResults(query) {
  const response = await fetch(`/api/palm/${query}`);
  const data = response.json();
  return data;
}

async function getSearchResultData(titles) {
  const titlesUrl = titles.map((item) => {
    return search(item, 1);
  });
  const searchResponse = await Promise.all(
    titlesUrl.map(async (item) => {
      const resp = await fetch(item);
      return resp.json();
    })
  );
  const filteredSearch = searchResponse
    .map((item) => (item.results.length > 0 ? item.results : null))
    .filter((n) => n)
    .filter((item) => item.media_type !== "person");

  let topSearch = filteredSearch.map((searchRes) => {
    return searchRes
      .map((item) =>
        titles.find(
          (t) => t === item.original_name || t === item.name || t === item.title
        )
          ? item
          : null
      )
      .filter((i) => i);
  });
  topSearch = topSearch
    .map((item) => (item.length > 0 ? item[0] : null))
    .filter((item) => item);
  return {
    results: topSearch,
  };
}

export default function Suggestions() {
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

  const handleOnFocus = (e) => {
    e.target.setAttribute(
      "placeholder",
      "City of God, The Godfather, Goodfellas"
    );
  };
  const handleOnBlur = (e) => {
    e.target.setAttribute(
      "placeholder",
      "Tell us atleast 3 movies, tv series that you like"
    );
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (query.length === 0) {
      return;
    } else {
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
      const data = await getSearchResults(query);
      const ai_response = data.response
        .split("\n")
        .map((item) => item.replaceAll("*", "").trim());
      const titlesRecommended = await getSearchResultData(ai_response);
      setShowRes(true);
      setSearchRes(titlesRecommended);
    }
  };

  return (
    <>
      <div className="bg-base-100">
        <div className="container mx-auto min-h-screen px-8">
          <div className="grid w-full place-items-center pt-2 text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-wider">
              Leave the Browsing to Us
            </h1>
            <p className="text-base md:text-2xl font-medium mt-1">
              AI-Powered Recommendations for Every Mood
            </p>
          </div>
          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Wait a moment!</h3>
              <p className="py-4">
                You have already used AI recommendations for 10 times. Please
                come back tomorrow.
              </p>
              <div className="modal-action">
                <button className="btn">Close</button>
              </div>
            </form>
          </dialog>
          <div className="grid place-items-center mt-8">
            <div className="w-3/4 md:w-1/2">
              <form
                onSubmit={handleOnSubmit}
                className="flex grow place-items-center"
              >
                <SearchIcon />
                <input
                  className={`form input w-full input-bordered input-primary focus:outline-none`}
                  type="text"
                  placeholder={
                    "Tell us atleast 3 movies, tv series that you like"
                  }
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                />
              </form>
            </div>
          </div>
          {submitted &&
            (showRes ? (
              <div className="mt-4 pb-8">
                <div className="flex w-full place-content-center font-bold text-4xl mb-4">
                  Here are the Recommendations
                </div>
                {searchRes.results.length > 0 ? (
                  <CollectionSearchClient arr={searchRes.results} />
                ) : (
                  <div>
                    Can&apos;t find any recommendations. Please try again
                  </div>
                )}
              </div>
            ) : (
              <Loading />
            ))}
        </div>
      </div>
    </>
  );
}
