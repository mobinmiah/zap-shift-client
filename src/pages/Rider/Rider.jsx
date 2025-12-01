import React from "react";
import riderImg from "../../assets/agent-pending.png";
import { useLoaderData } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const Rider = () => {
  const { user } = useAuth();
  // const axiosSecure = useAxiosSecure();
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
  const district = useWatch({ control, name: "district" });

  const districtsByRegions = (region) => {
    const regionDistricts = branches.filter((b) => b.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const coveredAreasByDistrict = (district) => {
    const districtData = branches.find((b) => b.district === district);
    return districtData?.covered_area || [];
  };

  const handleRiderApplication = (data) => {
    console.log(data);
  };

  return (
    <div className="mt-10 bg-base-100 p-8 lg:p-12 rounded-2xl shadow-sm">
      {/* Header */}
      <h2 className={`text-start!`}>Be a Rider</h2>
      <p className="max-w-2xl text-gray-600 mb-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 items-center">
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
              />
            </div>
            <div>
              <label className="label">Driving License Number</label>
              <input
                type="text"
                className="input w-full focus:outline-primary"
                placeholder="Driving License Number"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
              {...register('email')}
                type="email"
                className="input w-full focus:outline-primary"
                defaultValue={user.email || user.providerData.email}
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
              <label className="label">Your Area</label>
              <select
                {...register("coveredArea")}
                defaultValue="Select Area"
                className="select w-full focus:outline-primary"
                required
              >
                <option disabled={true}>Select Area</option>
                {coveredAreasByDistrict(district).map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">NID No</label>
              <input
              {...register('nidNumber')}
                type="text"
                className="input w-full focus:outline-primary"
                placeholder="Your NID No"
              />
            </div>
            <div>
              <label className="label">Phone No</label>
              <input
              {...register('phoneNumber')}
                type="text"
                className="input w-full focus:outline-primary"
                placeholder="Your Phone No"
              />
            </div>
            <div>
              <label className="label">Bike Brand Model and Year</label>
              <input
              {...register('bikeInfo')}
                type="text"
                className="input w-full focus:outline-primary"
                placeholder="Bike Brand Model and Year"
              />
            </div>
            <div>
              <label className="label">Bike Registration Number</label>
              <input
              {...register("bikeRegisterNumber")}
                type="text"
                className="input w-full focus:outline-primary"
                placeholder="Bike Registration Number"
              />
            </div>

            <div>
              <label className="label">Tell Us About Yourself</label>
              <textarea
              {...register('bikerInfo')}
                placeholder="Receiver Instruction"
                className="textarea w-full focus:outline-primary"
              ></textarea>
            </div>

            <div>
              <button className="btn bg-primary text-secondary mt-4 w-full">
                Submit
              </button>
            </div>
          </fieldset>
        </form>

        {/* Image */}
        <div className="flex justify-center items-center">
          <img src={riderImg} className="w-72 md:w-full" alt="Rider" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
