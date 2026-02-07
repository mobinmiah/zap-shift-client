import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialButton from "../SocialButton/SocialButton";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [passType, setPassType] = useState(false);
  const { logInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");

  const handleLogin = (data) => {
    setLoginError("");
    logInUser(data.email, data.password)
      .then((result) => {
        navigate(location?.state || "/");
      })
      .catch((error) => {
        let errorMessage = "Login failed. Please check your credentials.";

        // Handle specific Firebase auth errors
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage =
              "No account found with this email. Please check your email or register first.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please try again.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email format. Please enter a valid email.";
            break;
          case "auth/user-disabled":
            errorMessage = "This account has been disabled.";
            break;
          default:
            errorMessage = error.message || "Login failed. Please try again.";
        }

        setLoginError(errorMessage);
      });
  };
  return (
    <div>
      <title>Login | zapShift</title>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2>Welcome back</h2>
        <p className=" text-center">Please Login</p>
        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full focus:outline-primary"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="!text-error">Email is required</p>
            )}
            <label className="label">Password</label>

            <div className="relative">
              <input
                type={passType ? "text" : "password"}
                {...register("password", { required: true })}
                className="input w-full focus:outline-primary"
                placeholder="Password"
              />

              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer z-10"
                onClick={() => setPassType(!passType)}
              >
                {passType ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {errors.password?.type === "required" && (
              <p className="!text-error">Password is required</p>
            )}
            {loginError && (
              <div className="alert alert-error mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{loginError}</span>
              </div>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn bg-primary mt-4">Login</button>
          </fieldset>
        </form>
        <SocialButton></SocialButton>
        <p className="mb-3 text-center">
          Don't have an account?{" "}
          <Link state={location.state} to="/register" className="text-blue-400">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
