import Image from "next/image";
import { shimmer, toBase64 } from "../utils";

export default function CardImage({ src, alt }) {
  return (
    <div className="relative w-full rounded-lg">
      <div className="relative h-[200px] md:h-[140px] lg:h-[174px] w-full">
        <Image
          className="rounded-lg"
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "scale-down" }}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(240, 140)
          )}`}
          unoptimized
        />
      </div>
    </div>
  );
}
