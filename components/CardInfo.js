export default function CardInfo({ title, year, genre }) {
  return (
    <div>
      <div className="mt-2 flex text-xs font-light md:text-sm">
        <p>{renderYear(year)}</p>
        <div className='flex items-center px-2 before:content-["•"] gap-2'>
          {genre.slice(0, 2).map((item) => {
            return (
              <div key={item.id} className="badge badge-outline">
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
      <h2 className="truncate capitalize font-bold text-ellipsis sm:max-w-[200px] hover:max-w-xs">
        {title}
      </h2>
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
