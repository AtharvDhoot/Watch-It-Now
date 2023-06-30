"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export function ThemeChangeButton() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <button
      className="btn-circle btn ml-4"
      onClick={(e) => {
        if (!isMounted) return;

        if (theme === "bumblebee") setTheme("night");
        else setTheme("bumblebee");
      }}
    >
      {isMounted && theme === "bumblebee" ? (
        <DarkModeIcon />
      ) : (
        <LightModeIcon />
      )}
    </button>
  );
}
