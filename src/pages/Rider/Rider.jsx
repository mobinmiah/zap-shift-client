import React from "react";
import riderImg from "../../assets/agent-pending.png";
import { useLoaderData } from "react-router";

const Rider = () => {
  const branches = useLoaderData();

  return (
    <div className="bg-base-100 mt-10 rounded-2xl p-10">
      {/* Header Section */}
      <h2 className={`text-start!`}>Be a Rider</h2>
      <p className="max-w-2xl mb-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Form Section */}
        <form className="w-full space-y-6">
          <h3 className="border-b border-gray-300 pb-3">
            Tell us about yourself
          </h3>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-secondary font-semibold  ">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="border p-3 rounded-md w-full focus:outline-primary"
              />
            </div>
            <div>
              <label className="label text-secondary font-semibold">Age</label>
              <input
                type="number"
                placeholder="Your Age"
                className="border p-3 rounded-md w-full focus:outline-primary"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-secondary font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="border p-3 rounded-md w-full focus:outline-primary"
              />
            </div>
            <div>
              <label className="label text-secondary font-semibold">
                Select your region
              </label>
              <select className="border p-3 rounded-md w-full focus:outline-primary">
                <option defaultChecked disabled>
                  Select your region
                </option>
                {branches.map((branch, index) => (
                  <option key={index}>{branch.district}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-secondary font-semibold  ">
                NID No
              </label>
              <input
                type="number"
                placeholder="NID Number"
                className="border p-3 rounded-md w-full focus:outline-lime-500"
              />
            </div>
            <div>
              <label className="label text-secondary font-semibold  ">
                Contact
              </label>

              <input
                type="number"
                placeholder="Contact Number"
                className="border p-3 rounded-md w-full focus:outline-lime-500"
              />
            </div>
          </div>

          {/* Warehouse */}
          <div>
            <label className="label text-secondary font-semibold  ">
              Which wire-house you want to work?
            </label>
            <select className="border p-3 rounded-md w-full focus:outline-lime-500">
              <option>Select wire-house</option>
              {branches.map((branch) =>
                branch.covered_area.map((area, index) => (
                  <option key={index}>{area}</option>
                ))
              )}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary hover:bg-primary text-secondary font-semibold py-3 rounded-md w-full"
          >
            Submit
          </button>
        </form>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={riderImg}
            alt="Rider Illustration"
            className="max-w-sm w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Rider;
