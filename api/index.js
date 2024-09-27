import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
console.log("Initializing Google Generative AI...");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
console.log("Google Generative AI initialized");

const fileManager = new GoogleAIFileManager(process.env.API_KEY);
console.log("File Manager initialized");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
console.log("Model selected: gemini-1.5-flash");

// Function to upload the file with retries
async function uploadFileWithRetry(filePath, options, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const uploadResponse = await fileManager.uploadFile(filePath, options);
      return uploadResponse; // Return response if successful
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === retries) throw error; // Re-throw after final attempt
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
    }
  }
}

// Main execution
try {
  const uploadResponse = await uploadFileWithRetry("media/gemini.pdf", {
    mimeType: "application/pdf",
    displayName: "Gemini 1.5 PDF",
  });
  console.log(`Uploaded file: ${uploadResponse.file.displayName} as ${uploadResponse.file.uri}`);

  // Generate content using text and the URI reference for the uploaded file.
  const result = await model.generateContent([
    {
      fileData: { 
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    { text: "Can you summarize this document as a bulleted list?" },
  ]);

  // Output the generated text to the console
  console.log("Generated text:", result.response.text());
} catch (error) {
  console.error("Error during file upload or content generation:", error);
}
