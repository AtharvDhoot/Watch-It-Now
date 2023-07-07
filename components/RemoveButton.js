"use client";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { removeTitle } from "@/firebase/firestore/RemoveTitle";
import useAuth from "@/firebase/hooks/useAuth";

export function RemoveButton({ category, id }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const handleRemoveClick = async () => {
    if (user) {
      if (category === "movie") {
        await removeTitle(user.uid, [id], []);
      }
      if (category === "tv") {
        await removeTitle(user.uid, [], [id]);
      }
    } else if (typeof window !== "undefined") {
      if (category === "movie") {
        let ids = JSON.parse(localStorage.getItem("watch-later-movies"));
        ids = ids.filter((item) => item !== id);
        localStorage.setItem("watch-later-movies", JSON.stringify(ids));
      }
      if (category === "tv") {
        let ids = JSON.parse(localStorage.getItem("watch-later-tv"));
        ids = ids.filter((item) => item !== id);
        localStorage.setItem("watch-later-tv", JSON.stringify(ids));
      }
    }
    toast.success("The title has been removed in your watch later list.", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    router.refresh();
  };

  return (
    !isLoading && (
      <button onClick={handleRemoveClick}>
        <RemoveCircleOutlineIcon />
      </button>
    )
  );
}
