"use client";

import React from "react";

const ResponsePage = () => {
  const handleBackClick = () => {
    // Logic to go back to the previous page
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-custom_background_color">
      <header className="p-4 gap-[500px] flex items-center rounded-full">
        <div className="font-bold text-3xl text-black font-inter pl-3">PrepPal</div>
      </header>

      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="min-h-screen flex-1 flex justify-center items-center flex-col">
          <div className="font-extrabold text-6xl text-black-400 font-inter mb-6">
            Here's your
            <span className="font-bold text-6xl" style={{ color: "#a7ece3" }}>
              {" "}
              cheatsheet!
            </span>
          </div>
          <div className="font text-2xl pb-5 pt-2">
            Your file has been converted to the following cheatsheet:
          </div>

          <div className="w-full max-w-4xl bg-white border border-gray-300 shadow-md rounded-lg p-6 mt-6">
            <div className="text-lg text-black-600">
              {/* Display the cheatsheet content here */}
              <p>Your cheatsheet content will be displayed here...</p>
              <p>You can insert the content dynamically if you handle it on the backend.</p>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex gap-4 mt-8">
            <label
              onClick={handleBackClick}
              className="flex items-center justify-center w-58 p-4 bg-black text-white border rounded-full cursor-pointer hover:bg-custom-hover transition-colors"
            >
              <span className="font-bold">Back</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsePage;
