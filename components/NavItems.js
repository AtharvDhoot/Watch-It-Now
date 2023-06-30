"use client";

export default function NavItems({ items }) {
  return (
    <ul className="w-full justify-between items-center flex gap-4">{items}</ul>
  );
}
