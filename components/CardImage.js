import Image from "next/image";
import { shimmer, toBase64 } from "../utils";
import ReactPlayer from "react-player";
import Loading from "./Loading";
import { useHover } from "@uidotdev/usehooks";

export default function CardImage({ src, alt, officialTrailerKey, onClick }) {
  const [ref, hovering] = useHover();

  return (
    <div className="relative w-full rounded-lg">
      <div className="relative h-[200px] w-full" ref={ref}>
        {officialTrailerKey?.video?.key ? (
          hovering ? (
            <ReactPlayer
              width="100%"
              height="200px"
              playing={hovering}
              pip
              controls={true}
              url={`https://www.youtube.com/watch?v=${officialTrailerKey.video.key}`}
              fallback={<Loading />}
            />
          ) : (
            <Image
              className="rounded-lg"
              src={src}
              alt={alt}
              fill
              style={{ objectFit: "cover" }}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(240, 140)
              )}`}
              unoptimized
            />
          )
        ) : (
          <Image
            className="rounded-lg"
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "scale-down" }}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(200, 200)
            )}`}
            unoptimized
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
}
