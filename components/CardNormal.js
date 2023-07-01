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
  const router = useRouter();

  const handleClick = () => {
    if (category === "movie") {
      router.push(`/movie/${id}`);
    } else if (category === "tv") {
      router.push(`/tv/${id}`);
    }
  };

  return (
    <div className="grow basis-1/5 w-full cursor-pointer mb-4 sm:mb-0">
      <CardImage
        src={src}
        alt={title}
        officialTrailerKey={officialTrailerKey}
        onClick={handleClick}
      />
      <CardInfo
        id={id}
        category={category}
        rating={rating}
        title={title}
        year={year}
        genre={genre}
        onClick={handleClick}
      />
    </div>
  );
}
