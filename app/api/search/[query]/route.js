import { search } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { query } = params;
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  try {
    const response = await fetch(search(query, page));
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
