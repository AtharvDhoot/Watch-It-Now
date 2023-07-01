import Image from "next/image";
import { shimmer, TMDB_IMAGE_ENDPOINT, toBase64 } from "../utils";

export function FilmImageAndVideo({ src, title, videos }) {
  return (
    <>
      <div className="grid place-items-center">
        <Image
          className="rounded-lg"
          src={`${TMDB_IMAGE_ENDPOINT}/${src}`}
          alt={title}
          width={350}
          height={530}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(350, 530)
          )}`}
          unoptimized
        />
      </div>
    </>
  );
}
