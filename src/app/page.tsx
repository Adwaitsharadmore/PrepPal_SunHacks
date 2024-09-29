"use client";

import { useEffect } from "react";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      title: "notes to cheatsheets",
      description: "Effortlessly turn your notes into exam-ready cheatsheets. prepPal condenses your material into clear, bite-sized summaries, helping you focus on the key points so you can study smarter and stress less.",
      image: "/images/feature1.png",  // Corrected path
    },
    {
      title: "ask and ace",
      description: "No more sifting through pages—get answers to specific questions in an instant!",
      image: "/images/quiz-yourself.jpg",  // Corrected path
    },
    {
      title: "quiz yourself",
      description: "Challenge yourself and reinforce your learning by creating quizzes from your notes.",
      image: "/images/ask-questions.jpg",  // Corrected path
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen bg-custom-bg" style={{ backgroundColor: "#f6f1eb" }}>
      {/* Upper Header Section */}
      <header className="p-4 flex justify-center">
        <div className="flex gap-5 pl-10 pr-10 items-center bg-black p-2.5 rounded-full text-white shadow-lg custom-shadow">
          <Link href="/login">
            <span className="cursor-pointer">Login</span>
          </Link>
          <Link href="/contact">
            <span className="cursor-pointer">Contact</span>
          </Link>
          <Link href="/">
            <span className="cursor-pointer">Home</span>
          </Link>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="min-h-screen flex-1 flex justify-center items-center flex-col section">
          <div className="font-bold text-6xl text-black font-inter mb-4 text-center">
            prepPal
          </div>

          <div className="font-extrabold text-4xl text-black-400 font-inter mb-2 text-center">
            for last-minute
            <span className="font-bold text-4xl" style={{ color: "#a7ece3" }}>
              {" "}studies
            </span>
          </div>

          <div className="font text-xl pb-5 pt-2 text-center">
            convert notes to cheatsheets
          </div>

          <Link href='/responsePage'>
            <label className="flex items-center justify-center w-58 p-4 bg-black text-white border rounded-full cursor-pointer hover:bg-custom-hover transition-colors">
              <input type="file" className="hidden" />
              <span className="font-bold">let's get to studying</span>
            </label>
          </Link>
        </div>
      </div>

      {/* Mission Section */}
      <section className="min-h-screen bg-black text-white flex justify-center items-center rounded-t-3xl section">
        <div className="w-full max-w-6xl p-16 mx-6 my-8">
          <h1 className="text-5xl md:text-6xl font-extrabold font-inter leading-snug text-center">
            prepPal is for when you <br /> totally didn't forget to study.
          </h1>

          <p className="mt-4 text-base md:text-xl font-light max-w-4xl mx-auto text-center">
            tailored to the urgent needs of students who find themselves in a time-sensitive predicament starting late for exams and needing to cram while still aiming for academic excellence.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black section">
        <div className="container mx-auto px-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} items-center mb-16`}
            >
              <div className="md:w-1/2 p-4">
                <Image
                  src={feature.image}  // Use feature.image, not features.image
                  alt={feature.title}
                  width={500}
                  height={300}
                  className="object-cover"
                />
              </div>

              <div className="md:w-1/2 p-4">
                <h3 className="text-4xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-lg text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
