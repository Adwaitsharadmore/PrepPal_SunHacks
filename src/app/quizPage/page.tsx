"use client";
import { useState, useEffect } from "react";

const QuizPage = () => {
  const [quizContent, setQuizContent] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Store the selected answer
  const [feedback, setFeedback] = useState(null); // Correct/Incorrect feedback
  const [showAnswer, setShowAnswer] = useState(false); // Whether to show the correct answer or not

  // Simulate fetching quiz content (Replace this with actual API call or content fetching)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const quiz = urlParams.get("quiz");

    if (quiz) {
      const parsedQuiz = parseQuizContent(quiz); // Parse the quiz content into questions
      setQuizContent(parsedQuiz);
    }
  }, []);

  // Function to parse the quiz content and return a list of questions
  const parseQuizContent = (quiz) => {
    const questions = quiz.split("{").filter((item) => item.includes("?")); // Split by "{"
    const parsedQuestions = questions.map((q) => {
      const [questionPart, optionsPart] = q.split("}"); // Split by "}"
      
      // Extract options inside the square brackets `[]`
      const optionsMatch = optionsPart.match(/\[([^\]]+)\]/); // Find everything inside square brackets
      const options = optionsMatch ? optionsMatch[1].split("\n").map(opt => opt.trim()) : []; // Split by newline or other delimiters

      // Find the correct answer (after the square brackets)
      const correctAnswerMatch = optionsPart.match(/\(([a-d])\)/);
      const correctAnswerLetter = correctAnswerMatch ? correctAnswerMatch[1] : null;

      return {
        question: questionPart.trim(),
        options: options, // Store cleaned options
        correctAnswer: correctAnswerLetter, // Store the correct answer letter (e.g., "c")
      };
    });
    return parsedQuestions;
  };

  // Handle answer selection
  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    const correctAnswerLetter = quizContent[currentQuestion].correctAnswer; // Get correct answer letter (e.g., "c")
    const selectedOptionLetter = quizContent[currentQuestion].options[
      index
    ].charAt(0); // Get the letter of the selected option (e.g., "a", "b", etc.)

    if (selectedOptionLetter === correctAnswerLetter) {
      setFeedback("Correct answer!");
      setShowAnswer(false); // No need to show the correct answer if the selected one is correct
    } else {
      setFeedback("Wrong answer!");
      setShowAnswer(true); // Show correct answer if the selected one is wrong
    }
  };

  // Move to the next question
  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setCurrentQuestion((prev) => prev + 1);
  };

  if (!quizContent.length) {
    return <div>Loading quiz...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Here's your quiz!</h1>

      {/* Question Slide */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-3/4">
        <h2 className="text-2xl mb-4">{quizContent[currentQuestion].question}</h2>

        {/* Options */}
        <ul>
          {quizContent[currentQuestion].options.map((option, index) => (
            <li
              key={index}
              className={`border p-4 rounded-lg my-2 cursor-pointer 
              ${
                selectedAnswer === index && feedback === "Correct answer!"
                  ? "bg-green-300"
                  : selectedAnswer === index
                  ? "bg-red-300"
                  : "bg-white"
              }`} // Turn green if correct, red if wrong
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`mt-4 text-lg font-bold ${
            feedback.includes("Correct") ? "text-green-500" : "text-red-500"
          }`}
        >
          {feedback}
          {showAnswer && (
            <div className="text-green-500 mt-2">
              Correct answer:{" "}
              {
                quizContent[currentQuestion].options.find((opt) =>
                  opt.startsWith(quizContent[currentQuestion].correctAnswer)
                )
              }
            </div>
          )}
        </div>
      )}

      {/* Next button */}
      <button
        className="mt-6 bg-black text-white px-4 py-2 rounded-full"
        onClick={handleNextQuestion}
        disabled={currentQuestion === quizContent.length - 1} // Disable on the last question
      >
        {currentQuestion === quizContent.length - 1 ? "Finish Quiz" : "Next"}
      </button>
    </div>
  );
};

export default QuizPage;
