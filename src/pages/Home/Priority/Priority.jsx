import React from "react";
import merchant from "../../../assets/location-merchant.png";

const Priority = () => {
  return (
    <div className="bg-mercahnt rounded-2xl my-20 p-10 lg:p-20 shadow-xl flex flex-col-reverse lg:flex-row justify-between items-center gap-10">
      <div className="space-y-5 max-w-xl">
        <h5 className="text-white lg:text-start text-3xl font-extrabold">
          Merchant and Customer Satisfaction is Our First Priority
        </h5>

        <p className={`text-white/80! leading-relaxed`}>
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <button className="btn bg-primary outline outline-primary text-secondary rounded-full btn-sm md:btn-md lg:btn-lg">
            Become a Merchant
          </button>

          <button className="btn bg-transparent text-primary outline outline-primary rounded-full btn-sm md:btn-md lg:btn-lg">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>

      {/* Right side Illustration */}
      <img src={merchant} alt="" className="max-w-xs lg:max-w-sm" />
    </div>
  );
};

export default Priority;
