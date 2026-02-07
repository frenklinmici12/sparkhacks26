
import { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';
import './App.css'; // Assuming styles are here or I can inline them for now
// Ideally, we import the JSON data. For now, since it works with the file path logic locally via backend script, 
// the Cloud Function expects { jsonContent: ... }. 
// So we need to import likely 'wellness.json' here to send it.
import wellnessData from '../hashtag_jsons/lifestyle_jsons/wellness.json';

const TrendCard = ({ title, summary, videoLinks }) => (
  <div style={{
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    margin: '16px 0',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }}>
    <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{title}</h3>
    <p style={{ color: '#555', lineHeight: '1.5' }}>{summary}</p>
    {videoLinks && videoLinks.length > 0 && (
      <div style={{ marginTop: '15px' }}>
        <p style={{ fontSize: '0.9em', fontWeight: '600', color: '#7f8c8d' }}>Related Videos:</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {videoLinks.map((link, index) => (
            <a 
              key={index} 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                fontSize: '0.9em',
                color: '#3498db',
                textDecoration: 'none',
                border: '1px solid #3498db',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
            >
              Watch Video {index + 1}
            </a>
          ))}
        </div>
      </div>
    )}
  </div>
);

function LandingPage() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyzeTrends = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get reference to the function
      const analyzeTrendsFn = httpsCallable(functions, 'analyzeTrends');
      
      // 2. Call the function with data
      // Note: The function expects { jsonContent: ... }
      const result = await analyzeTrendsFn({ jsonContent: wellnessData });
      
      // 3. Update state with result
      console.log("Result from backend:", result.data);
      setTrends(result.data); // result.data contains the return value of the function
      
    } catch (err) {
      console.error("Error fetching trends:", err);
      setError("Failed to fetch trends. Ensure the local emulator is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='landing-page' style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Trend Analyzer</h1>
      <p>Discover the latest trends in wellness powered by Gemini AI.</p>
      
      <div style={{ margin: '30px 0' }}>
        <button 
          onClick={handleAnalyzeTrends} 
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: loading ? '#95a5a6' : '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          {loading ? 'Analyzing...' : 'Analyze Wellness Trends'}
        </button>
      </div>

      {error && (
        <div style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      <div className='results-container'>
        {trends.map((trend, index) => (
          <TrendCard 
            key={index}
            title={trend.title}
            summary={trend.summary}
            videoLinks={trend.video_links}
          />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
