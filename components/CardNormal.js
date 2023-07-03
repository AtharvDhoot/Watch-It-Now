import { useRouter } from "next/navigation";
import CardImage from "./CardImage";
import CardInfo from "./CardInfo";

export default function CardNormal({
  id,
  category,
  rating,
  src,
  title,
  year,
  genre,
  officialTrailerKey,
}) {
  return (
    <div className="grow basis-1/5 w-full mb-4 sm:mb-0">
      <CardImage
        src={src}
        alt={title}
        officialTrailerKey={officialTrailerKey}
        category={category}
        id={id}
      />
      <CardInfo
        id={id}
        category={category}
        rating={rating}
        title={title}
        year={year}
        genre={genre}
      />
    </div>
  );
}
