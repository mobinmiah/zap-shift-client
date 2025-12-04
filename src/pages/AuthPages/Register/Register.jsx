import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialButton from "../SocialButton/SocialButton";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [passType, setPassType] = useState(false);
  const { registerUser, updateUsersProfile, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_URL_API = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_photo_host_key
        }`;
        axios.post(image_URL_API, formData).then((res) => {
          const photoURL = res.data.data.url;

          // crreate user in the db
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the databse");
              // update user profile
              const updateProfile = {
                displayName: data.name,
                photoURL: photoURL,
              };
    
              updateUsersProfile(updateProfile)
                .then()
                .catch((error) => console.log(error));
              navigate(location?.state || "/");
            }
          })
          .catch(error=>console.log(error))

        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <title>Register | zapShift</title>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2>Welcome to zapShift</h2>
        <p className=" text-center">Create an account</p>
        <form onSubmit={handleSubmit(handleRegister)} className="card-body">
          <fieldset className="fieldset">
            {/* name field */}
            <label className="label">Name</label>
            <input
              {...register("name", { required: true })}
              type="texet"
              className="input w-full focus:outline-primary"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="!text-error">Name is required</p>
            )}
            {/* photo field */}
            <label className="label">Photo</label>
            <input
              {...register("photo", { required: true })}
              type="file"
              className="file-input w-full focus:outline-primary"
              placeholder="Your Photo"
            />
            {errors.photo?.type === "required" && (
              <p className="!text-error">Photo is required</p>
            )}
            {/* email field */}
            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input w-full focus:outline-primary"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="!text-error">Email is required</p>
            )}
            {/* password field */}
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
            {errors.password?.type === "minLength" && (
              <p className="!text-error">
                Password must be at least 6 characters or long
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="!text-error">
                Password must contain at least one uppercase, at least one
                lowercase, at least one special character and at least one
                number
              </p>
            )}

            <button className="btn bg-primary mt-4">Register</button>
          </fieldset>
        </form>
        <SocialButton></SocialButton>
        <p className="mb-3 text-center">
          Already have an accunt?{" "}
          <Link state={location.state} to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
