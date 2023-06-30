import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-base-content text-lg h-[8vh] grid bg-base-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
        <div className="flex items-center">
          Build with <span className="text-primary text-2xl px-1">&#9825;</span>
          by&nbsp;
          <Link href="/" className="underline underline-offset-2">
            Atharv Dhoot
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
