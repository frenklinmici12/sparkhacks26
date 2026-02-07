# Sparkhacks 2026 - Trend Analysis App

This application analyzes social media trends using the Google Gemini API. It consists of a React frontend and a local Node.js Express backend.

## Prerequisites

- Node.js (v18 or higher recommended)
- A Google Gemini API Key ([Get one here](https://aistudio.google.com/))

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables**
    - Copy `.env.example` to a new file named `.env`:
      ```bash
      cp .env.example .env
      ```
    - Open `.env` and paste your actual Gemini API Key:
      ```
      GEMINI_API_KEY=your_actual_key_here
      ```

3.  **Run the Application**
    This command starts both the backend server (port 3000) and the React frontend (port 5173).
    ```bash
    npm start
    ```

4.  **Open in Browser**
    - Visit `http://localhost:5173`
    - Navigate to a hashtag page (e.g., `/hashtag/fitness`) to see the trend analysis.

## Project Structure

- `src/backend/`: specific application backend logic.
- `src/pages/`: React frontend pages.
- `public/hashtag_jsons/`: JSON data files used for analysis.

