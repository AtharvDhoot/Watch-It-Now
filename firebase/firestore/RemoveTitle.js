import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import config from "../config";

export async function removeTitle(uid, movieIds, tvIds) {
  try {
    await updateDoc(doc(config.db, "watch-later", uid), {
      movieIds: arrayRemove(...movieIds),
      tvIds: arrayRemove(...tvIds),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
