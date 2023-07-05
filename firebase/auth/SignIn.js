import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import config from "../config";

const auth = getAuth(config.firebase_app);

export default async function SignIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
