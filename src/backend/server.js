
import express from 'express';
import cors from 'cors';
import { analyzeTrends } from './analyze_trends.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit if JSONs are large

app.post('/analyze', async (req, res) => {
  try {
    const { jsonContent } = req.body;
    
    if (!jsonContent) {
      return res.status(400).json({ error: 'Missing jsonContent in request body' });
    }

    const trends = await analyzeTrends(jsonContent);
    res.json(trends);
  } catch (error) {
    console.error("Error in /analyze:", error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
