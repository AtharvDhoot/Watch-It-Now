"use client";

import CollectionSearch from "@/components/CollectionSearch";
import Loading from "@/components/Loading";
import { search } from "@/lib/tmdb";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

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
  const topSearch = searchResponse
    .map((item) => (item.results.length > 0 ? item.results[0] : null))
    .filter((n) => n)
    .filter((item) => item.media_type !== "person");
  return {
    results: topSearch,
  };
}

export default function Suggestions() {
  const [query, setQuery] = useState("");

  const [searchRes, setSearchRes] = useState(null);
  const [showRes, setShowRes] = useState(false);
  const [submitted, setSubmitted] = useState(null);

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
      setSubmitted(true);
      const data = await getSearchResults(query);
      console.log(data);
      const ai_response = data.response.split("\n");
      console.log(ai_response);
      const titlesRecommended = await getSearchResultData(ai_response);
      console.log(titlesRecommended);
      setShowRes(true);
      setSearchRes(titlesRecommended);
    }
  };

  return (
    <>
      <div className="bg-base-100">
        <div className="container mx-auto min-h-screen">
          <div className="grid w-full place-items-center pt-2">
            <h1 className="text-5xl font-bold tracking-wider">
              Leave the Browsing to Us
            </h1>
            <p className="text-2xl font-medium mt-1">
              AI-Powered Recommendations for Every Mood
            </p>
          </div>
          <div className="grid place-items-center mt-8">
            <div className="w-1/2">
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
                <CollectionSearch arr={searchRes.results} />
              </div>
            ) : (
              <Loading />
            ))}
          {/* <div className="flex items-center justify-between mt-4">
            <div className="text-xl">Want to sync your data? Sign Up!</div>
            <div className="flex gap-4">
              <button className="btn btn-primary">Sign Up</button>
              <button className="btn btn-primary">Login</button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
