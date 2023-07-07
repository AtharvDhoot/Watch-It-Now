"use client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { addTitle } from "@/firebase/firestore/AddTitle";
import useAuth from "@/firebase/hooks/useAuth";

export function AddButton({ category, id }) {
  const { user, isLoading } = useAuth();
  const handleAddWatchLaterClick = async () => {
    if (user) {
      if (category === "movie") {
        await addTitle(user.uid, [id], []);
      }
      if (category === "tv") {
        await addTitle(user.uid, [], [id]);
      }
    } else {
      if (category === "movie") {
        const ids = JSON.parse(localStorage.getItem("watch-later-movies"));
        if (ids) {
          !ids.includes(id)
            ? localStorage.setItem(
                "watch-later-movies",
                JSON.stringify([...ids, id])
              )
            : toast.error("The title is already added in your watch list", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
        } else {
          localStorage.setItem("watch-later-movies", JSON.stringify([id]));
        }
      }
      if (category === "tv") {
        const ids = JSON.parse(localStorage.getItem("watch-later-tv"));
        if (ids) {
          localStorage.setItem("watch-later-tv", JSON.stringify([...ids, id]));
        } else {
          localStorage.setItem("watch-later-tv", JSON.stringify([id]));
        }
      }
    }
    toast.success("The title has been added in your watch later list.", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  return (
    !isLoading && (
      <button onClick={handleAddWatchLaterClick}>
        <AddCircleOutlineIcon />
      </button>
    )
  );
}
