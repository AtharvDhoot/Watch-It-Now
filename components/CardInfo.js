import Link from "next/link";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CardInfo({ id, category, rating, title, year, genre }) {
  const handleWatchLaterClick = () => {
    if (category === "movie") {
      const ids = JSON.parse(localStorage.getItem("watch-later-movies"));
      if (ids) {
        localStorage.setItem(
          "watch-later-movies",
          JSON.stringify([...ids, id])
        );
      } else {
        localStorage.setItem("watch-later-movies", JSON.stringify([id]));
      }
    }
    if (category === "tv") {
      const ids = JSON.parse(localStorage.getItem("watch-later-tv"));
      if (ids) {
        localStorage.setItem("watch-later-tv", JSON.stringify([...ids, id]));
      } else {
        localStorage.setItem("watch-later-tv", JSON.stringify([id]));
      }
    }
    toast.success("The title has been added in your watch later list.", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="grid">
          <div className="mt-2 flex text-xs font-light md:text-sm">
            <p>{renderYear(year)}</p>
            <div className='flex items-center px-2 before:content-["•"] gap-2'>
              {genre &&
                genre.slice(0, 2).map((item) => {
                  return (
                    <div
                      key={item?.id}
                      className="badge badge-outline truncate"
                    >
                      {item?.name}
                    </div>
                  );
                })}
            </div>
          </div>
          <Link
            href={`/${category}/${id}`}
            className="truncate capitalize font-bold text-ellipsis sm:max-w-[180px] hover:max-w-xs hover:underline"
          >
            {title}
          </Link>
        </div>
        <div className="grid place-items-center mr-2">
          <button onClick={handleWatchLaterClick}>
            <AddCircleOutlineIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function renderYear(year) {
  if (!year) {
    return "N/A";
  } else {
    return year.substring(0, 4);
  }
}
