"use client";
import React, { useState } from "react";
import Link from "next/link";

const ResponsePage = () => {
  const [cheatsheetContent, setCheatsheetContent] = useState(null);
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [textPrompt, setTextPrompt] = useState(""); // State to store the text prompt
  const [loadingCheatsheet, setLoadingCheatsheet] = useState(false); // Loading state for cheatsheet
  const [loadingQuiz, setLoadingQuiz] = useState(false); // Loading state for quiz

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      alert("No file selected. Please try again.");
    }
  };

  // Function to handle cheatsheet generation
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please upload a file");
      return;
    }

    setLoadingCheatsheet(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("textPrompt", textPrompt);

    try {
      const response = await fetch("http://localhost:3001/upload-and-generate", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setCheatsheetContent(data.generatedText);
    } catch (error) {
      console.error("Error fetching cheatsheet content:", error);
    } finally {
      setLoadingCheatsheet(false);
    }
  };

  // Function to handle quiz generation and redirect to quizPage with the quiz content
  const handleGenerateQuiz = async () => {
    if (!file) {
      alert("Please upload a file");
      return;
    }

    setLoadingQuiz(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "textPrompt",
      "Can you generate 5 multiple-choice questions based on the key concepts in the document?"
    );

    try {
      const response = await fetch(
        "http://localhost:3001/upload-and-generate-quiz",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      // Redirect to the new quiz page with generated quiz content
      window.location.href = `/quizPage?quiz=${encodeURIComponent(
        data.generatedQuiz
      )}`;
    } catch (error) {
      console.error("Error fetching quiz content:", error);
    } finally {
      setLoadingQuiz(false);
    }
  };
  
const renderCheatsheetAsList = () => {
  if (!cheatsheetContent) return null;

  // Split the cheatsheet content by double newlines to separate sections
  const sections = cheatsheetContent.split("\n\n").filter((section) => section.trim() !== "");

  return (
    <div>
      {sections.map((section, index) => {
        // Split section by newlines to separate the lines
        const lines = section.split("\n").filter((line) => line.trim() !== "");
        
        return (
          <div key={index} className="mb-6">
            {lines.map((line, lineIndex) => {
              // Remove hyphens at the start of lines
              const cleanedLine = line.replace(/^\-\s*/, "").trim();

              if (cleanedLine.startsWith("{") && cleanedLine.endsWith("}")) {
                // Main title with curly brackets
                const mainTitle = cleanedLine.replace(/^\{(.*?)\}$/, "$1");
                return (
                  <h1 key={lineIndex} className="font-extrabold text-3xl text-black-600 mb-4">
                    {mainTitle}
                  </h1>
                );
              } else if (cleanedLine.startsWith("[") && cleanedLine.endsWith("]")) {
                // Subtopic with square brackets
                const subtopic = cleanedLine.replace(/^\[(.*?)\]$/, "$1");
                return (
                  <h2 key={lineIndex} className="font-bold text-xl text-black-600 mb-2">
                    {subtopic}
                  </h2>
                );
              } else {
                // Regular bullet points without hyphens
                return (
                  <ul key={lineIndex} className="list-disc pl-5">
                    <li className="text-lg text-black-600 mb-2">
                      {cleanedLine} {/* Display points as clean bullet points */}
                    </li>
                  </ul>
                );
              }
            })}
          </div>
        );
      })}
    </div>
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

            {/* Generate Cheatsheet Button */}
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-full"
              disabled={loadingCheatsheet}
            >
              {loadingCheatsheet ? "Generating..." : "Generate Cheatsheet"}
            </button>
            {/* Generate Quiz Button */}
            <button
              type="button"
              className="bg-black text-white px-4 py-2 rounded-full ml-4"
              onClick={handleGenerateQuiz}
              disabled={loadingQuiz}
            >
              {loadingQuiz ? "Generating..." : "Generate Quiz"}
            </button>
          </form>

          <div className="w-full max-w-4xl bg-white border border-gray-300 shadow-md rounded-lg p-6 mt-6">
            <div className="text-lg text-black-600">
              {cheatsheetContent ? (
                renderCheatsheetAsList()
              ) : (
                <p>
                  {loadingCheatsheet
                    ? "Generating your cheatsheet..."
                    : "Your cheatsheet content will be displayed here once generated."}
                </p>
              )}
            </div>
          </div>

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
