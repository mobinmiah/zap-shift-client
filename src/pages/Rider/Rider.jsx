import React from "react";
import riderImg from "../../assets/agent-pending.png";
import { useLoaderData } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Rider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const branches = useLoaderData();
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const regionsDuplicate = branches.map((b) => b.region);
  const regions = [...new Set(regionsDuplicate)];
  const region = useWatch({ control, name: "region" });

  const districtsByRegions = (region) => {
    const regionDistricts = branches.filter((b) => b.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {

    axiosSecure.post("riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Applicaton is in precess, You will be notified",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div className="mt-4 md:mt-10 bg-base-100 p-4 lg:p-12 rounded-xl shadow-sm">
      {/* Header */}
      <h2 className={`text-start!`}>Be a Rider</h2>
      <p className="max-w-2xl mb-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 lg:gap-10">
        {/* Form */}
        <form
          onSubmit={handleSubmit(handleRiderApplication)}
          className="space-y-3 lg:space-y-6"
        >
          <h3>Tell us about yourself</h3>
          <fieldset className="fieldset">
            <div>
              <label className="label">Your Name</label>
              <input
                {...register("name")}
                type="text"
                className="input w-full focus:outline-primary"
                defaultValue={user.displayName || user.providerData.displayName}
                readOnly
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                {...register("email")}
                type="email"
                className="input w-full focus:outline-primary"
                defaultValue={user.email || user.providerData.email}
                readOnly
              />
            </div>
            <div>
              <label className="label">Driving License Number</label>
              <input
                {...register("drivingLicense")}
                type="text"
                className="input w-full focus:outline-primary"
                placeholder="Driving License Number"
              />
            </div>
            <div>
              <label className="label">Your Region</label>
              <select
                {...register("region")}
                defaultValue="Select Region"
                className="select w-full focus:outline-primary"
                required
              >
                <option disabled={true}>Select Region</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Your District</label>
              <select
                {...register("district")}
                defaultValue="Select District"
                className="select w-full focus:outline-primary"
                required
              >
                <option disabled={true}>Select District</option>
                {districtsByRegions(region).map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">NID No</label>
              <input
                {...register("nid")}
                type="text"
                className="input w-full focus:outline-primary"
                placeholder="Your NID No"
              />
            </div>
            <div>
              <label className="label">Phone No</label>
              <input
                {...register("phone")}
                type="text"
                className="input w-full focus:outline-primary"
                placeholder="Your Phone No"
              />
            </div>
            <div>
              <label className="label">Bike Brand Model and Year</label>
              <input
                {...register("bikeInfo")}
                type="text"
                className="input w-full focus:outline-primary"
                placeholder="Bike Brand Model and Year"
              />
            </div>
            <div>
              <label className="label">Bike Registration Number</label>
              <input
                {...register("bikeRegister")}
                type="text"
                className="input w-full focus:outline-primary"
                placeholder="Bike Registration Number"
              />
            </div>

            <div>
              <label className="label">Tell Us About Yourself</label>
              <textarea
                {...register("bikerInfo")}
                placeholder="Receiver Instruction"
                className="textarea w-full focus:outline-primary"
              ></textarea>
            </div>

            <div>
              <input
                type="submit"
                value="Apply as a Rider"
                className="btn bg-primary text-secondary mt-4 w-full"
              />
            </div>
          </fieldset>
          {/* Image */}
        </form>
        <div className="hidden md:flex justify-center items-center">
          <img src={riderImg} className="w-full" alt="Rider" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
