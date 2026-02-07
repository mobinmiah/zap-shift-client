import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const branches = useLoaderData();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const regionsDuplicate = branches.map((b) => b.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const senderDistrict = useWatch({ control, name: "senderDistrict" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const receiverDistrict = useWatch({ control, name: "receiverDistrict" });

  const districtsByRegions = (region) => {
    const regionDistricts = branches.filter((b) => b.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const coveredAreasByDistrict = (district) => {
    const districtData = branches.find((b) => b.district === district);
    return districtData?.covered_area || [];
  };

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const parcelWeight = Number(parseFloat(data.parcelWeight));
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    data.cost = cost;

    Swal.fire({
      title: "Confirm Parcel Submission",
      html: `
      <div style="text-align:left;">
        <p><b>Parcel Name:</b> ${data.parcelName}</p>
        <p><b>Weight:</b> ${data.parcelWeight} KG</p>
        <p><b>Cost:</b> <span style="color:#3085d6; font-weight:bold;">৳${cost}</span></p>
        <hr/>
        <p><b>Sender:</b> ${data.senderName}, ${data.senderDistrict}, ${data.senderCoveredArea}</p>
        <p><b>Receiver:</b> ${data.receiverName}, ${data.receiverDistrict}, ${data.receiverCoveredArea}</p>
      </div>
    `,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm & Send",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
        });
        navigate("/dashboard/my-parcels");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Parcel has created, Please Pay",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };
  return (
    <div className="px-4 md:px-12 lg:px-24 py-10 lg:py-20 bg-base-100 rounded-2xl mt-8">
      <h2 className={`text-start!`}>Send A Parcel</h2>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-8 border-t border-gray-300 space-y-6 pt-7"
      >
        <h3>Enter your parcel details</h3>

        {/* parcel type: document/non-document */}
        <div className="flex flex-wrap gap-6">
          <label className="label flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="document"
              {...register("parcelType")}
              className="radio radio-primary"
              defaultChecked
              required
            />
            Document
          </label>
          <label className="label flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType")}
              className="radio radio-primary"
              required
            />
            Non-Document
          </label>
        </div>

        {/* parcel info: name, weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-7">
          <fieldset className="fieldset space-y-1">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full focus:outline-primary"
              placeholder="Parcel Name"
              required
            />
          </fieldset>
          <fieldset className="fieldset space-y-1">
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="text"
              {...register("parcelWeight")}
              className="input w-full focus:outline-primary"
              placeholder="Parcel Weight"
              required
            />
          </fieldset>
        </div>

        {/* tow column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-300 pt-7">
          {/* sender details */}

          <fieldset className="fieldset space-y-1">
            <h4>Sender Details</h4>
            {/* sender name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              className="input w-full focus:outline-primary"
              defaultValue={
                user?.displayName || user?.providerData[0]?.displayName
              }
              required
            />

            {/* sender Email */}

            <label className="label">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              className="input w-full focus:outline-primary"
              defaultValue={user?.email || user?.providerData[0]?.email}
              required
            />

            {/* sender contact */}
            <label className="label">Sender Contact No</label>
            <input
              type="text"
              {...register("senderContact")}
              className="input w-full focus:outline-primary"
              placeholder="Sender Contact No"
              required
            />

            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="label">Sender Region</legend>
              <select
                {...register("senderRegion")}
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
            </fieldset>

            {/* sender district */}
            <fieldset className="fieldset">
              <legend className="label">Sender District</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Select District"
                className="select w-full focus:outline-primary"
                required
              >
                <option disabled={true}>Select District</option>
                {districtsByRegions(senderRegion).map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender covered area */}
            <fieldset className="fieldset">
              <legend className="label">Sender Area</legend>
              <select
                {...register("senderCoveredArea")}
                defaultValue="Select Area"
                className="select w-full focus:outline-primary"
                required
              >
                <option disabled={true}>Select Area</option>
                {coveredAreasByDistrict(senderDistrict).map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender street address*/}
            <label className="label">Sender Street Address</label>
            <input
              type="text"
              {...register("senderStreetAddress")}
              className="input w-full focus:outline-primary"
              placeholder="Sender Street Address"
              required
            />
            {/* pickup instructions */}
            <label className="label">Pickup Instruction</label>
            <textarea
              {...register("pickupInstruction")}
              placeholder="Pickup Instruction"
              className="textarea w-full focus:outline-primary"
            ></textarea>
          </fieldset>

          {/* receiver details */}

          <fieldset className="fieldset space-y-1">
            <h4>Receiver Details</h4>
            {/* receiver name */}
            <label className="label">Receiver Name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full focus:outline-primary"
              placeholder="Receiver Name"
              required
            />
            {/* receiver email */}
            <label className="label">Receiver Email</label>
            <input
              type="email"
              {...register("receiverEmail")}
              className="input w-full focus:outline-primary"
              placeholder="Receiver Email"
              required
            />
            {/* receiver contact */}
            <label className="label">Receiver Contact No</label>
            <input
              type="text"
              {...register("receiverContact")}
              className="input w-full focus:outline-primary"
              placeholder="Receiver Contact No"
              required
            />

            {/* receiver region */}
            <fieldset className="fieldset">
              <legend className="label">Receiver Region</legend>
              <select
                {...register("receiverRegion")}
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
            </fieldset>

            {/* receiver district */}

            <fieldset className="fieldset">
              <legend className="label">Receiver District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Select District"
                className="select w-full focus:outline-primary"
                required
              >
                <option disabled={true}>Select District</option>
                {districtsByRegions(receiverRegion).map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver covered area */}
            <fieldset className="fieldset">
              <legend className="label">Receiver Area</legend>
              <select
                {...register("receiverCoveredArea")}
                defaultValue="Select Area"
                className="select w-full focus:outline-primary"
                required
              >
                <option disabled={true}>Select Area</option>
                {coveredAreasByDistrict(receiverDistrict).map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver street address*/}
            <label className="label">Receiver Street Address</label>
            <input
              type="text"
              {...register("receiverStreetAddress")}
              className="input w-full focus:outline-primary"
              placeholder="Receiver Street Address"
              required
            />
            {/* receiver instructions */}
            <label className="label">Receiver Instruction</label>
            <textarea
              {...register("receiverInstruction")}
              placeholder="Receiver Instruction"
              className="textarea w-full focus:outline-primary"
            ></textarea>
          </fieldset>
        </div>
        <div className="flex justify-center pt-4">
          <input
            type="submit"
            value="Send Parcel"
            className="btn bg-primary px-8"
          />
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
