"use client";
import React, { useState } from "react";
import Link from "next/link";

const ResponsePage = () => {
  const [cheatsheetContent, setCheatsheetContent] = useState(null);
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [textPrompt, setTextPrompt] = useState(""); // State to store the text prompt
  const [loading, setLoading] = useState(false); // Loading state for the request

  // Function to handle file upload
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      alert("No file selected. Please try again.");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please upload a file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("textPrompt", textPrompt);

    try {
      const response = await fetch(
        "http://localhost:3001/upload-and-generate",
        {
          method: "POST",
          body: formData, // Send form data with the file and prompt
        }
      );
      const data = await response.json();
      setCheatsheetContent(data.generatedText); // Set the cheatsheet content
    } catch (error) {
      console.error("Error fetching cheatsheet content:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to reload the page
  const handleBackClick = () => {
    window.location.reload(); // Reload the current page
  };

  // Function to format the cheatsheet content into bullet points
  const renderCheatsheetAsList = () => {
    if (!cheatsheetContent) return null;

    // Split the content by new lines and filter out empty lines
    const points = cheatsheetContent
      .split("\n")
      .filter((point) => point.trim() !== "");

    return (
      <ul className="list-disc pl-5">
        {points.map((point, index) => (
          <li key={index} className="text-lg text-black-600 mb-2">
            {point}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f6f1eb" }}>
      <header className="p-4 gap-[500px] flex items-center rounded-full">
        <Link href="/">
          <div className="font-bold text-3xl font-sans text-black pl-3">
            PrepPal
          </div>
        </Link>
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

          {/* File Upload and Text Prompt Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-4xl bg-white border border-gray-300 shadow-md rounded-lg p-6 mt-6"
          >
            <div className="mb-4">
              <label className="block text-lg font-medium text-black-600">
                Upload File
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2 p-2 border border-gray-400 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-black-600">
                Text Prompt (Optional)
              </label>
              <input
                type="text"
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                className="mt-2 p-2 border border-gray-400 rounded w-full"
                placeholder="Enter any additional prompt (optional)"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-full"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Cheatsheet"}
            </button>
          </form>

          {/* Display the cheatsheet content */}
          <div className="w-full max-w-4xl bg-white border border-gray-300 shadow-md rounded-lg p-6 mt-6">
            <div className="text-lg text-black-600">
              {cheatsheetContent ? (
                renderCheatsheetAsList() // Render the formatted list
              ) : (
                <p>
                  {loading
                    ? "Generating your cheatsheet..."
                    : "Your cheatsheet content will be displayed here once generated."}
                </p>
              )}
            </div>
          </div>

          {/* Back Button */}
          <div className="flex gap-4 mt-8">
            <Link href="/">
              <label className="flex items-center justify-center w-58 p-4 bg-black text-white border rounded-full cursor-pointer hover:bg-custom-hover transition-colors">
                <span className="font-bold">Back</span>
              </label>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsePage;
