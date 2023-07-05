import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import config from "../config";

const auth = getAuth(config.firebase_app);

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  return {
    user,
    isLoading,
  };
};

export default useAuth;
