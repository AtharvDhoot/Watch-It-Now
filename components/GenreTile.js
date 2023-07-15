"use client";

export default function GenreTile({ name, selected }) {
  return (
    <div
      className={`text-center px-4 py-10 truncate rounded-xl border-2 ${
        selected ? "bg-primary !text-primary-content" : ""
      }`}
    >
      {name}
    </div>
  );
}
