import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm();
  const handleSendParcel = (data) => {
    console.log(data);
  };
  return (
    <div className="px-24 py-20 bg-base-100 rounded-2xl mt-8">
      <h2 className={`text-start!`}>Send A Parcel</h2>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 border-t border-gray-300 space-y-7 pt-7"
      >
        <h3>Enter your parcel details</h3>
        {/* parcel type: document/non-document */}
        <div>
          <input
            type="radio"
            value="Document"
            name="radio-3"
            className="radio radio-primary mr-3"
            defaultChecked
          />
          <input type="radio" name="radio-3" className="radio radio-primary" />
        </div>
        {/* parcel info: name, weight */}
        <div></div>
        {/* tow column */}
        <div>
          {/* sender info */}
          <div></div>
          {/* receiver info */}
          <div></div>
        </div>
        <input type="submit" value="Send" className="btn bg-primary" />
      </form>
    </div>
  );
};

export default SendParcel;
