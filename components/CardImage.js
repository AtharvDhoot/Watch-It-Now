"use client";

import Image from "next/image";
import Link from "next/link";

import ReactPlayer from "react-player";
import { useHover } from "@uidotdev/usehooks";

import Loading from "./Loading";
import { shimmer, toBase64 } from "../utils";

export default function CardImage({
  src,
  alt,
  officialTrailerKey,
  id,
  category,
}) {
  const [ref, hovering] = useHover();

  return (
    <div className="relative w-full rounded-lg">
      <div className="relative h-[200px] w-full" ref={ref}>
        {officialTrailerKey?.video?.key ? (
          hovering ? (
            <ReactPlayer
              width="100%"
              height="200px"
              playing={false}
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
              style={{ objectFit: "scale-down" }}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(2, 2)
              )}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )
        ) : (
          <Link href={`/${category}/${id}`}>
            <div className="relative h-[200px] w-full">
              <Image
                className="rounded-lg"
                src={src}
                alt={alt}
                fill
                style={{ objectFit: "scale-down" }}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(2, 2)
                )}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
