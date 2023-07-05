import { doc, getDoc } from "firebase/firestore";
import config from "../config";

export async function getTitles(uid) {
  try {
    const docRef = doc(config.db, "watch-later", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {
    return e;
  }
}
