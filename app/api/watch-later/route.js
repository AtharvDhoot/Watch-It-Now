import { getMovieDetail, getTvDetail } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const movieIds = JSON.parse(searchParams.get("movieIds"));
  const tvIds = JSON.parse(searchParams.get("tvIds"));
  let movieUrls = [];
  let tvUrls = [];
  for (let i = 0; i < movieIds?.length; i++) {
    movieUrls.push(getMovieDetail(movieIds[i]));
  }
  for (let i = 0; i < tvIds?.length; i++) {
    tvUrls.push(getTvDetail(tvIds[i]));
  }
  try {
    const movieResponse = await Promise.all(
      movieUrls.map(async (item) => {
        const resp = await fetch(item);
        return resp.json();
      })
    );
    const tvResponse = await Promise.all(
      tvUrls.map(async (item) => {
        const resp = await fetch(item);
        return resp.json();
      })
    );
    return NextResponse.json({
      movieResults: movieResponse,
      tvResults: tvResponse,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
