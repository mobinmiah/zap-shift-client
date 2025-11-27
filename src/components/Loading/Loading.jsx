import React from "react";
import loaderGif from "../../assets/running.gif";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10 min-h-screen">
      <div className="p-4 rounded-full bg-primary">
        <img
          src={loaderGif}
          alt="loading..."
          className="w-12 h-12 object-contain"
        />
      </div>

      <p className="text-base font-medium animate-pulse text-primary">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
