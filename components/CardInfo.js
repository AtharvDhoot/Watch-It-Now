import Link from "next/link";

import AddRemoveButton from "./AddRemoveButton";

export default function CardInfo({ id, category, title, year, genre }) {
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
        <AddRemoveButton category={category} id={id} />
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
