import { search } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const titles = params.titles.split(",");
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
  return NextResponse.json({
    results: topSearch,
  });
}
