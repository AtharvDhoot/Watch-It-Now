"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { pathToSearchAll } from "@/utils";
import ChildDismissibleDropdown from "./ChildDismissibleDropdown";
import { ThemeChangeButton } from "./ThemeChangeButton";
import NavItems from "./NavItems";
import SearchBar from "./SearchBar";

export default function Navbar(props) {
  return (
    <nav className="navbar h-[8vh] bg-base-100 px-6 md:px-12">
      <div className="container m-auto grid grid-cols-2 md:grid-cols-8">
        <div className="col-span-1">
          <Link href={props.title.route} className="text-xl normal-case">
            <Image
              src="/logo.png"
              width={120}
              height={20}
              alt="Watch it now logo"
              className="w-auto h-auto"
              priority
            />
          </Link>
        </div>
        <div className="ml-4 hidden md:flex md:col-span-3">
          <SearchBar searchPath={pathToSearchAll} />
        </div>
        <div className="col-span-1 md:col-span-4 place-self-end">
          <div className={"hidden md:flex"}>
            <NavItems items={GetListItems(props.navItems)} />
            <ThemeChangeButton />
          </div>

          <div className="flex md:hidden space-x-2">
            <ThemeChangeButton />
            <ChildDismissibleDropdown>
              {GetListItems(props.navItems)}
            </ChildDismissibleDropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}

function GetListItems(navItems) {
  const pathname = usePathname();

  return navItems.map((item) => (
    <li key={item.label}>
      <Link
        prefetch
        href={item.route}
        className="text-[15px] font-[600] text-light/90 dark:text-dark my-2 relative group"
      >
        {item.label}
        <span
          className={`h-[1px] inline-block absolute left-0 -bottom-0.5 bg-base-content 
                      group-hover:w-full transition-[width] ease duration-300
                      ${pathname === item.route ? "w-full" : "w-0"}`}
        >
          &nbsp;
        </span>
      </Link>
    </li>
  ));
}
