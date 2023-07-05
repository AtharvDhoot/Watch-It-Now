"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import SignIn from "@/firebase/auth/SignIn";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

import Link from "next/link";
import SignInGoogle from "@/firebase/auth/SignInGoogle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTitle, initial } from "@/firebase/firestore/AddTitle";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const router = useRouter();

  const handleGoogleLoginIn = async () => {
    const { result, error } = await SignInGoogle();
    if (error) {
      toast.error("Log in not successfull, Try again", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    await initial(result.user.uid);
    toast.success("Log in successfull, Redirecting", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setTimeout(() => router.push("/watch-later"), 1000);
  };

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await SignIn(email, password.password);

    if (error) {
      return console.log(error);
    }
    toast.success("Log in successfull, Redirecting", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setTimeout(() => router.push("/watch-later"), 2000);
  };

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  return (
    <div className="bg-base-100 h-[84vh] flex flex-col">
      <div className="container max-w-sm md:max-w-md mx-auto flex-1 flex flex-col items-center justify-center p-4 md:p-0">
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
        <div className="bg-primary bg-opacity-20 px-6 py-8 rounded-xl shadow-md w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleForm}>
            <div className="grid gap-6">
              <input
                type="text"
                className="input w-full"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="form-control">
                <div className="input-group">
                  <input
                    type={`${password.showPassword ? "text" : "password"}`}
                    className="input w-full"
                    name="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  <div
                    className="btn btn-square !bg-base-100"
                    onClick={handleClickShowPassword}
                  >
                    {password.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn w-full btn-outline">
                Login
              </button>
            </div>
          </form>

          <button className="btn w-full mt-4" onClick={handleGoogleLoginIn}>
            <div className="flex place-items-center text-xs sm:text-sm gap-1 sm:gap-2">
              <GoogleIcon />
              <div>Login In with Google</div>
            </div>
          </button>
        </div>

        <div className=" mt-6">
          Dont&apos;t have an account?{" "}
          <Link
            className="no-underline border-b border-blue text-blue"
            href="/signup"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
