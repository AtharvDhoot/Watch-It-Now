import Link from "next/link";

export default function CardInfo({ id, category, rating, title, year, genre }) {
  return (
    <div>
      <div className="mt-2 flex text-xs font-light md:text-sm">
        <p>{renderYear(year)}</p>
        <div className='flex items-center px-2 before:content-["•"] gap-2'>
          {genre &&
            genre.slice(0, 2).map((item) => {
              return (
                <div key={item?.id} className="badge badge-outline">
                  {item?.name}
                </div>
              );
            })}
        </div>
      </div>
      <Link
        href={`/${category}/${id}`}
        className="truncate capitalize font-bold text-ellipsis sm:max-w-[250px] hover:max-w-xs hover:underline"
      >
        {title}
      </Link>
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
