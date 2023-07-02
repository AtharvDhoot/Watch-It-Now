import Link from "next/link";

export default function Heading({ href, isHomePage, media_type, title }) {
  return (
    <div className="mb-8 flex items-end justify-between mx-6 md:mx-0">
      {isHomePage ? (
        <div className="flex items-center">
          <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
          <p className="badge badge-outline uppercase tracking-wider text-xs ml-2 mt-1 font-semibold">
            {media_type}
          </p>
        </div>
      ) : (
        <h2 className="section-title">{title}</h2>
      )}
      <Link
        href={href}
        className="cursor-pointer text-xs font-medium uppercase tracking-wide hover:underline"
      >
        See more
      </Link>
    </div>
  );
}
