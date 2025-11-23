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

  const handleLogin = (data) => {
    console.log(data);
    logInUser(data.email, data.password)
      .then((result) => {
        console.log(result);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
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
