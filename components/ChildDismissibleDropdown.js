"use client";

import React, { useState, useEffect, useRef } from "react";

export default function ChildDismissibleDropdown(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdown = useRef(null);
  const dropdownBtn = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) {
      document.activeElement.blur();
    } else if (!dropdownBtn.current.contains(document.activeElement)) {
      setDropdownOpen(false);
    }
  }, [dropdownOpen]);

  return (
    <div ref={dropdownBtn} className="dropdown-end dropdown z-10">
      <label
        tabIndex={0}
        className="btn-square btn m-0"
        onBlur={() => {
          setDropdownOpen(false);
        }}
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <ul
        ref={dropdown}
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow-lg"
        onBlur={() => {
          dropdownBtn.current.focus();
          setDropdownOpen(false);
        }}
        onFocus={() => {
          setDropdownOpen(true);
        }}
        onClick={() => {
          setDropdownOpen(false);
        }}
      >
        {props.children}
      </ul>
    </div>
  );
}
