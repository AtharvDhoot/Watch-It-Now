import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export default async function SignInGoogle() {
  let result = null,
    error = null;

  try {
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
