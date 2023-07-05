import { getAuth, signOut } from "firebase/auth";
import config from "../config";

const auth = getAuth(config.firebase_app);

export async function SignOut() {
  try {
    await signOut(auth);
  } catch (e) {
    return e;
  }
}
