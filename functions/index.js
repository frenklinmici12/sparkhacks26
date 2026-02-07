const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");

// Load env vars from the root project directory for local development
if (process.env.FUNCTIONS_EMULATOR) {
    require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

// Initialize Firebase Admin
admin.initializeApp();

// Access environment variables securely via Firebase config or fallback to process.env for local dev with .env
// Note: For deployed functions, use `firebase functions:config:set gemini.key="THE_KEY"`
const API_KEY = process.env.GEMINI_API_KEY || functions.config().gemini?.key;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Cloud Function: analyzeTrends
 * Trigger: HTTPS Callable
 * Input: { jsonContent: object } OR { filePath: string } (if retrieving from storage, but let's start with direct payload or basic file reading if local)
 * 
 * Since the user wants to "take in a json file", we can either:
 * 1. Accept the JSON content directly as an argument.
 * 2. Accept a path to a file in Firebase Storage.
 * 
 * For simplicity in this iteration, we'll accept the JSON content directly to avoid complex storage permissions setup immediately.
 */
exports.analyzeTrends = functions.https.onCall(async (data, context) => {
  try {
    if (!API_KEY) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Gemini API Key is missing."
      );
    }

    const jsonContent = data.jsonContent;

    if (!jsonContent) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with an argument 'jsonContent' containing the data to analyze."
      );
    }

    // Limit to first 10 items to manage token usage/latency
    const dataToAnalyze = Array.isArray(jsonContent) ? jsonContent.slice(0, 10) : jsonContent;

    const prompt = `
      Analyze the following JSON data representing trending social media content.
      Identify top 3 trending topics based on the descriptions, hashtags, and statistics.
      
      Output the result as a JSON array of objects with the following keys:
      - title: A catchy title for the trend.
      - summary: A brief summary of what the trend is about (2-3 sentences).
      - video_links: An array of URLs to the representative videos from the data.
      
      Data:
      ${JSON.stringify(dataToAnalyze, null, 2)}
      
      Return ONLY valid JSON. Do not include markdown code blocks.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up potential markdown formatting
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(text);

  } catch (error) {
    console.error("Error in analyzeTrends:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while analyzing trends.",
      error.message
    );
  }
});
