import Link from "next/link";

export default function Pagination({
  currentPage,
  prevHref,
  nextHref,
  isFirst,
  isLast,
  totalPages,
}) {
  return (
    <div className="mt-8 pb-8 flex items-center justify-center join">
      <Link
        href={prevHref}
        className={`${isFirst ? "btn-disabled" : ""} join-item btn btn-outline`}
      >
        «
      </Link>
      <p className="join-item btn btn-outline">
        Page {currentPage} of {totalPages}
      </p>
      <Link
        href={nextHref}
        className={`${isLast ? "btn-disabled" : ""} join-item btn btn-outline`}
      >
        »
      </Link>
    </div>
  );
}
