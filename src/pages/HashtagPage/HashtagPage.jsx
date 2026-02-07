import { useState } from "react"
import { useEffect } from "react" // to fetch the data (also axios or fetch prolly)
import { useParams } from "react-router-dom"
import ReactPlayer from "react-player";

import TikTokEmbed from "../../components/TikTokEmbed/TikTokEmbed"; //tiktok is weird, need to make its own embed component

import "./HashtagPage.css"

function HashtagPage() {
    const { hashtagName } = useParams()
    const [posts, setPosts] = useState([])     // will be objects, ai innsight summary with associated links
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // List of known categories to search in
    const categories = ['lifestyle_jsons', 'entertainment_jsons', 'creativity_jsons'];

    const generateAiInsights = async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Find the correct JSON file
            let jsonContent = null;
            for (const category of categories) {
                try {
                    const response = await fetch(`/hashtag_jsons/${category}/${hashtagName}.json`);
                    if (response.ok) {
                        jsonContent = await response.json();
                        break;
                    }
                } catch (e) {
                    console.warn(`Could not find ${hashtagName} in ${category}`, e);
                }
            }

            if (!jsonContent) {
                throw new Error(`Data for hashtag #${hashtagName} not found.`);
            }

            // 2. Call local backend API
            const apiResponse = await fetch('http://localhost:3000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jsonContent }),
            });

            if (!apiResponse.ok) {
                const errorData = await apiResponse.json();
                throw new Error(errorData.error || 'Failed to analyze trends');
            }

            const trends = await apiResponse.json();
            setPosts(trends);

        } catch (err) {
            console.error("Error generating insights:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (hashtagName) {
            generateAiInsights();
        }
    }, [hashtagName]);


    //navabar will be replaced with component from ricky

    return (
        <>
            <div className="navbar">
                <h1>#{hashtagName}</h1>
            </div>
            <div className="ai-summaries">
                {loading && <p>Loading AI insights...</p>}
                {error && <p className="error">Error: {error}</p>}
                {!loading && !error && posts.length === 0 && <p>No insights available.</p>}
                
                {posts.map((post, index) => (
                    <div key={index} className="summary-card">
                        <h2>{post.title}</h2>
                        <p>{post.summary}</p>
                        <div className="video-links">
                            {post.video_links && post.video_links.map((link, i) => (
                                <div key={i} className="video-wrapper">
                                    <TikTokEmbed url={link} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="posts">
                <div className="scrolling-posts">
                    <h1>Relevant Posts</h1>
                    {/* Fallback or other content */}
                </div>
            </div>
        </>
    )
}

export default HashtagPage

/*{posts.map(post => (
                    <h2>hi</h2>
                ))}
                    
                
                
                {posts.map(post => (
                       <TikTokEmbed url={"https://www.tiktok.com/@drip/video/7601987918240009503"}></TikTokEmbed>
                    ))}
                */ 