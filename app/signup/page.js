"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import SignUp from "@/firebase/auth/SignUp";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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

    console.log(result);
    return router.push("/admin");
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

          {/* <div className="text-center text-sm mt-4">
            By signing up, you agree to the{" "}
            <a className="no-underline border-b border-base-content" href="#">
              {" "}
              Terms of Service
            </a>{" "}
            and
            <a className="no-underline border-b border-base-content" href="#">
              {" "}
              Privacy Policy
            </a>
          </div> */}
        </div>

        <div className=" mt-6">
          Already have an account?{" "}
          <a
            className="no-underline border-b border-blue text-blue"
            href="/signin"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Page;
