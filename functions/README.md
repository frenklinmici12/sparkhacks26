# Backend Functions - Trend Analysis

This directory contains the Firebase Cloud Functions for analyzing trends using the Google Gemini API.

## Setup for Teammates

If you are pulling this code or setting it up in a new environment, follow these steps:

### 1. Install Dependencies
Navigate to this `functions` directory and install the required packages:

```bash
cd functions
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root of your project (one level up from this `functions` folder) to store your API key securely.

**(Root) .env:**
```
GEMINI_API_KEY=your_actual_google_gemini_api_key
```
*Get your key from [Google AI Studio](https://aistudio.google.com/).*

### 3. Run Locally (Emulator)
To test the functions without deploying:

```bash
# From the project root
firebase emulators:start --only functions
```

The function `analyzeTrends` will be available to your local frontend.

### 4. Deploying (Optional)
If you have permissions to deploy to the live Firebase project:

```bash
# 1. Set the config variable for production
firebase functions:config:set gemini.key="YOUR_API_KEY"

# 2. Deploy
firebase deploy --only functions
```

## Function Usage
The `analyzeTrends` function is an HTTPS Callable function.

**Input:**
- `jsonContent` (Object): The JSON data to analyze (e.g., from `wellness.json`).

**Output:**
- Returns an array of trend objects:
  ```json
  [
    {
      "title": "Trend Title",
      "summary": "Description...",
      "video_links": ["url1", "url2"]
    }
  ]
  ```
