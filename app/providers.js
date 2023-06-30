"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider themes={["bumblebee", "night"]} defaultTheme="bumblebee">
      {children}
    </ThemeProvider>
  );
}
