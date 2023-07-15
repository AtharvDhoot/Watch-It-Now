"use client";

import { useState } from "react";
import GenreTile from "./GenreTile";

export default function GenreGrid({ allGenres }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedArray, setSelectedArray] = useState(
    new Array(allGenres.length).fill(false)
  );
  const loadMore = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <>
      <div className="flex-wrap gap-8 justify-center mt-6 hidden md:flex pb-10">
        <input
          value={selectedArray
            .map((item, idx) => (item ? allGenres[idx] : null))
            .filter((item) => item)}
          readOnly
          className="hidden"
          id="genre_selected_grid"
        />
        {allGenres.slice(0, 15).map((name, idx) => {
          return (
            <button
              type="button"
              key={idx}
              className="md:w-3/12 lg:w-1/6"
              onClick={() => {
                setSelectedArray(
                  selectedArray.map((item, i) => (i === idx ? !item : item))
                );
              }}
            >
              <GenreTile name={name} selected={selectedArray[idx]} />
            </button>
          );
        })}
        {isCompleted &&
          allGenres.map((name, idx) => {
            if (idx < 15) {
              return null;
            }
            return (
              <button
                type="button"
                key={idx}
                className="md:w-3/12 lg:w-1/6"
                onClick={() => {
                  setSelectedArray(
                    selectedArray.map((item, i) => (i === idx ? !item : item))
                  );
                }}
              >
                <GenreTile name={name} selected={selectedArray[idx]} />
              </button>
            );
          })}
      </div>
      <div className="hidden md:flex justify-center">
        {isCompleted ? (
          <button className="btn btn-primary" onClick={loadMore} type="button">
            Show Less
          </button>
        ) : (
          <button className="btn btn-primary" onClick={loadMore} type="button">
            Load More
          </button>
        )}
      </div>
    </>
  );
}
