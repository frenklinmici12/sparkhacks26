
  import { GoogleGenerativeAI } from "@google/generative-ai";
  import dotenv from "dotenv";
  import fs from "fs/promises";
  import path from "path";
  import { fileURLToPath } from 'url';

  import { dirname } from 'path';
  const __dirname = dirname(fileURLToPath(import.meta.url));

  dotenv.config({ path: path.resolve(__dirname, '.env') });
  
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY not found in .env file");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  export async function analyzeTrends(dataToAnalyze) {
    try {
      const prompt = `
        Analyze the following JSON data showing trending social media content.
        Find top 3 trending topics based on the descriptions, hashtags, and statistics.
        
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
      
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();

      return JSON.parse(text);

    } catch (error) {
      console.error("Error analyzing trends:", error);
      throw error;
    }
  }

  // CLI Support
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const filePath = process.argv[2];
    if (!filePath) {
      console.error("Please provide a path to the JSON file.");
      console.log("Usage: node src/backend/analyze_trends.js <path_to_json_file>");
      process.exit(1);
    }
    
    (async () => {
      try {
        const absolutePath = path.resolve(filePath);
        const fileContent = await fs.readFile(absolutePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);
        const data = Array.isArray(jsonData) ? jsonData.slice(0, 10) : jsonData;
        const trends = await analyzeTrends(data);
        console.log(JSON.stringify(trends, null, 2));
      } catch (error) {
        console.error(error);
      }
    })();
  }
