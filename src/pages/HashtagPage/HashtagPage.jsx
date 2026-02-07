import { useState } from "react"
import { useEffect } from "react" // to fetch the data (also axios or fetch prolly)
import { useParams } from "react-router-dom"
import ReactPlayer from "react-player";

import TikTokEmbed from "../../components/TikTokEmbed/TikTokEmbed"; //tiktok is weird, need to make its own embed component

import "./HashtagPage.css"

function HashtagPage() {
    const { hashtagName } = useParams()

    const {posts, setPosts} = useState([])     // will be objects, ai innsight summary with associated links

    const generateAiInsights = () => {
        // gpt prompt with hashtagName -> find relevant posts, summarize , return ai response
        //fetch from backend , set it
        return null;
    }


    //navabar will be replaced with component from ricky

    return (
        <>
            <div className="navbar">
                <h1>#{hashtagName}</h1>
            </div>
            <div className="ai-summaries">
                
            </div>
            
            <div className="posts">
                <div className="scrolling-posts">
                    <h1>Relevant Posts</h1>
                    
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