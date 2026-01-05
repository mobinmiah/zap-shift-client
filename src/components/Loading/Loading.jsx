import React from "react";
import loaderGif from "../../assets/running.gif";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="relative">
        {/* Animated background circle */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
        <div className="relative p-6 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg">
          <img
            src={loaderGif}
            alt="Loading animation"
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-secondary animate-pulse">
          Loading...
        </p>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
