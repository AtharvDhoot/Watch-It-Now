"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import SignUp from "@/firebase/auth/SignUp";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { initial } from "@/firebase/firestore/AddTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState();
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    if (password.password !== confirmPassword.password) {
      setErrors("Passwords do not match");
    }
    const { result, error } = await SignUp(email, password.password);

    if (error) {
      return console.log(error);
    }
    await initial(result.user.uid);
    toast.success("Sign Up successfull, Redirecting", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setTimeout(() => router.push("/watch-later"), 1000);
  };

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPassword({
      ...confirmPassword,
      showPassword: !confirmPassword.showPassword,
    });
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
        <div className="bg-primary bg-opacity-20 px-6 py-8 rounded-xl shadow-md text-base-content w-full">
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
              <div className="form-control">
                <div className="input-group">
                  <input
                    type={`${
                      confirmPassword.showPassword ? "text" : "password"
                    }`}
                    className="input w-full"
                    name="confirm_password"
                    placeholder="Confirm password"
                    onChange={(e) =>
                      setConfirmPassword({
                        ...confirmPassword,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  <div
                    className="btn btn-square !bg-base-100"
                    onClick={handleClickShowConfirmPassword}
                  >
                    {confirmPassword.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </div>
                </div>
              </div>
              <div className="invalid-feedback w-full text-center text-error">
                {errors}
              </div>
              <button type="submit" className="btn w-full btn-outline">
                Create Account
              </button>
            </div>
          </form>
        </div>

        <div className=" mt-6">
          Already have an account?{" "}
          <Link
            className="no-underline border-b border-blue text-blue"
            href="/signin"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
