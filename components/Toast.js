"use client";

import { ToastContainer } from "react-toastify";

export default function Toast() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      theme={
        typeof window !== "undefined" &&
        localStorage.getItem("theme") === "night"
          ? "dark"
          : "light"
      }
      limit={1}
    />
  );
}
