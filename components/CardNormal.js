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
    <div
      className="grow basis-1/5 w-full cursor-pointer mb-4 sm:mb-0"
      onClick={handleClick}
    >
      <CardImage src={src} alt={title} />
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
