import Link from "next/link";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";

export default function CardInfo({ id, category, title, year, genre }) {
  const handleWatchLaterClick = () => {
    if (category === "movie") {
      const ids = JSON.parse(localStorage.getItem("watch-later-movies"));
      if (ids) {
        !ids.includes(id)
          ? localStorage.setItem(
              "watch-later-movies",
              JSON.stringify([...ids, id])
            )
          : toast.error("The title is already added in your watch list", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
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

  const pathname = usePathname();

  return (
    <div>
      <div className="flex justify-between mx-2">
        <div className="grid">
          <div className="mt-2 flex text-xs font-light md:text-sm">
            <p>{renderYear(year)}</p>
            <div className='flex items-center px-2 before:content-["•"] gap-2 '>
              {genre &&
                genre.slice(0, 2).map((item) => {
                  return (
                    <div
                      key={item?.id}
                      className="badge badge-outline text-ellipsis line-clamp-1 max-w-[100px] capitalize"
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
        {pathname !== "/watch-later" ? (
          <div className="grid place-items-center mr-2">
            <button onClick={handleWatchLaterClick}>
              <AddCircleOutlineIcon />
            </button>
          </div>
        ) : null}
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
