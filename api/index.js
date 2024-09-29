import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

// Initialize Google Generative AI and File Manager
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Function to upload a file with retries
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

// Route for file upload and cheatsheet generation
app.post('/upload-and-generate', upload.single('file'), async (req, res) => {
  const { file } = req;
  const { textPrompt } = req.body;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const filePath = file.path;

    // Upload the file with retries
    const uploadResponse = await uploadFileWithRetry(filePath, {
      mimeType: "application/pdf",
      displayName: file.originalname,
    });

    console.log(`Uploaded file: ${uploadResponse.file.displayName} as ${uploadResponse.file.uri}`);

    // Generate content using the uploaded file and the text prompt
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: textPrompt || "Can you create a cheat sheet of this document with the main title in curly brackets and sub topics in brackets and their bulltwt points and keep the text normal." },
    ]);

    // Return the generated text as response
    res.json({
      message: "Content generated successfully",
      generatedText: result.response.text(), // Output the generated text
    });

    // Delete the uploaded file from local storage
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("Error during file upload or content generation:", error);
    res.status(500).json({ error: "File upload or content generation failed" });
  }
});

// Route for file upload and quiz generation
// Route for file upload and quiz generation
app.post('/upload-and-generate-quiz', upload.single('file'), async (req, res) => {
  const { file } = req;
  const { textPrompt } = req.body;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const filePath = file.path;

    // Upload the file with retries
    const uploadResponse = await uploadFileWithRetry(filePath, {
      mimeType: "application/pdf",
      displayName: file.originalname,
    });

    console.log(`Uploaded file: ${uploadResponse.file.displayName} as ${uploadResponse.file.uri}`);

    // Generate quiz using the uploaded file and the text prompt
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: "Can you generate 5 multiple-choice questions based on the document provided with four options out of which one is the correct answer. Write the questions in curly brackets. Write the four options in square brackets. Write the correct option being in parenthesis at the end of the question. Make all the font normal." },
    ]);

    // Log the generated quiz content
    const generatedText = result.response.text(); // Assuming the AI returns text data
    console.log("Generated quiz content:", generatedText);

    // Return the generated quiz as response
    res.json({
      message: "Quiz generated successfully",
      generatedQuiz: generatedText, // Output the generated quiz
    });

    // Delete the uploaded file from local storage
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("Error during file upload or quiz generation:", error);
    res.status(500).json({ error: "File upload or quiz generation failed" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
