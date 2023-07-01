import { getUrl, trending } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { category, id } = params;
  try {
    const url = getUrl(trending + category, id);
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json({
      results: data.results,
      total_pages: data.total_pages,
      total_results: data.total_results,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
