"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import cors from "cors";
import express from "express";

export default function Home() {
  const features = [
    {
      title: "Real-World Insights Over Textbooks",
      description:
        "Gain hands-on experience and actionable business skills. Forget textbooks and lectures. PrepPal provides real-world strategies, taught by experts.",
      imgSrc: "/path-to-image1.jpg", // replace with actual image path
    },
    {
      title: "Learn On Your Own Time",
      description:
        "Flexible, self-paced education for busy students. Study anytime, anywhere, on any device. PrepPal is designed to fit into your schedule.",
      imgSrc: "/path-to-image2.jpg", // replace with actual image path
    },
    {
      title: "Build Your Network",
      description:
        "Forge lasting connections to accelerate your career. Connect with peers and educators, both online and in real-world networking events.",
      imgSrc: "/path-to-image3.jpg", // replace with actual image path
    },
  ];

  return (
    <div className="min-h-screen bg-custom-bg">
      {/* Header */}
      <header className="p-4 gap-[500px] flex items-center rounded-full">
        <Link href='/'>
          <div className="font-bold text-3xl text-black font-inter pl-3">PrepPal</div>
        </Link>
        <div className="flex gap-5 pl-10 pr-10 items-center bg-black p-2.5 rounded-full text-white shadow-lg custom-shadow">
          <div>Login</div>
          <div>Contact</div>
          <div>Home</div>
        </div>
      </header>

      {/* File Upload Section */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="min-h-screen flex-1 flex justify-center items-center flex-col">
          <div className="font-extrabold text-6xl text-black-400 font-inter">
            For last minute
            <span className="font-bold text-6xl" style={{ color: "#a7ece3" }}>
              {" "}
              studies
            </span>
          </div>
          <div className="font text-2xl pb-5 pt-2">
            Convert notes to cheatsheets
          </div>
          <Link href='/responsePage'>
          <label className="flex items-center justify-center w-58 p-4 bg-black text-white border rounded-full cursor-pointer hover:bg-custom-hover transition-colors">
            <input type="file" className="hidden" />
            <span className="font-bold">Let's make it</span>
          </label>
          </Link>
        </div>
      </div>

      {/* Vision and Mission Section */}
      <section className="py-10">
        <div className="container mx-auto px-6 bg-black rounded-3xl p-12 shadow-lg">
          <div className="flex gap-8 justify-center mb-12">
            <div className="w-1/3 p-8 bg-white rounded-3xl shadow-lg">
              <h2 className="text-4xl font-bold text-black mb-4 text-center">Our Vision</h2>
              <p className="text-lg text-gray-700 text-center">
                At PrepPal, we envision a world where students can efficiently prepare for their exams by
                focusing on key concepts, enabling them to ace their exams with confidence, even under time constraints.
              </p>
            </div>
            <div className="w-1/3 p-8 bg-white rounded-3xl shadow-lg">
              <h2 className="text-4xl font-bold text-black mb-4 text-center">Our Mission</h2>
              <p className="text-lg text-gray-700 text-center">
                Our mission is to create tools that simplify the study process. By providing students with concise,
                easy-to-digest cheatsheets from their course materials, we help them save time while boosting exam readiness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Alternating Layout */}
      <section className="py-20 bg-custom_background_color">
        <div className="container mx-auto px-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              } items-center mb-16`}
            >
              {/* Image Section */}
              <div className="md:w-1/2 p-4">
                <img
                  src={feature.imgSrc}
                  alt={feature.title}
                  className="w-full h-auto rounded-3xl shadow-lg"
                />
              </div>

              {/* Description Section */}
              <div className="md:w-1/2 p-4">
                <h3 className="text-4xl font-bold mb-4">{feature.title}</h3>
                <p className="text-lg text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}