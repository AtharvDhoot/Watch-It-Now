import { getMovieDetail } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const response = await fetch(getMovieDetail(id));
    const data = await response.json();
    return NextResponse.json({
      detail: data,
      videos: data.videos,
      credits: data.credits,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
