
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testFunction() {
  // Read wellness.json
  const jsonPath = path.join(__dirname, '../hashtag_jsons/lifestyle_jsons/wellness.json');
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log("Sending request to analyzeTrends function...");

  try {
    const response = await fetch('http://127.0.0.1:5001/sparkhacks2026/us-central1/analyzeTrends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          jsonContent: jsonData
        }
      }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    const result = await response.json();
    console.log("Function Response:");
    // The result object from an onCall function is wrapped in { result: ... }
    console.log(JSON.stringify(result.result, null, 2));

  } catch (error) {
    console.error("Error calling function:", error);
  }
}

testFunction();
