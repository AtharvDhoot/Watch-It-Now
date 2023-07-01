import { getTvVideos, getUrl, tvPopular } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const isFirst = searchParams.get("isFirst");

  try {
    const url = getUrl(tvPopular, id);
    const response = await fetch(url);
    const data = await response.json();
    if (isFirst) {
      const frontPageMovieIds = data.results.slice(0, 8).map((item) => {
        return { id: item.id };
      });
      const videosUrls = frontPageMovieIds.map((item) => {
        return { url: getTvVideos(item.id) };
      });
      const videosResponse = await Promise.all(
        videosUrls.map(async (item) => {
          const resp = await fetch(item.url);
          return resp.json();
        })
      );
      return NextResponse.json({
        results: data.results,
        videos: videosResponse,
        total_pages: data.total_pages,
        total_results: data.total_results,
      });
    } else {
      return NextResponse.json({
        results: data.results,
        total_pages: data.total_pages,
        total_results: data.total_results,
      });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
