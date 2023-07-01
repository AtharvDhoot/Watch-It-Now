import { getGenre, genreTV } from "../../../../../lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = getGenre(genreTV);
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json({
      genres: data.genres,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
