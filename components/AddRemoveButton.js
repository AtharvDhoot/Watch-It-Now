"use client";

import { AddButton } from "./AddButton";
import { RemoveButton } from "./RemoveButton";
import { usePathname } from "next/navigation";

export default function AddRemoveButton({ category, id }) {
  const pathname = usePathname();
  return pathname !== "/watch-later" ? (
    <div className="grid place-items-center mr-2">
      <AddButton category={category} id={id} />
    </div>
  ) : (
    <div className="grid place-items-center mr-2">
      <RemoveButton category={category} id={id} />
    </div>
  );
}
