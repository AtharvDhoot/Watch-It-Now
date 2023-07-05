import config from "../config";
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";

export async function initial(uid) {
  try {
    const docRef = doc(config.db, "watch-later", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(doc(config.db, "watch-later", uid), {
        movieIds: [],
        tvIds: [],
      });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function addTitle(uid, movieIds, tvIds) {
  try {
    await updateDoc(doc(config.db, "watch-later", uid), {
      movieIds: arrayUnion(...movieIds),
      tvIds: arrayUnion(...tvIds),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
