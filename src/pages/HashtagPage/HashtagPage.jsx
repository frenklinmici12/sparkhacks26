import { useState } from "react"
import { useEffect } from "react" // to fetch the data (also axios or fetch prolly)
import { useParams } from "react-router-dom"
import ReactPlayer from "react-player";

import "./HashtagPage.css"

function HashtagPage() {
    const { hashtagName } = useParams()

    const generateAiInsights = () => {
        // gpt prompt with hashtagName -> find relevant posts, summarize , return ai response
        return null;
    }

    const posts = [3, 1] //have post links here to imbed...

    //navabar will be replaced with component from ricky

    return (
        <>
            <div className="navbar">
                <h1>#{hashtagName}</h1>
            </div>
            <div className="ai-summaries">
                <button onClick={() => generateAiInsights()}>Generate Ai Insights...</button>
            </div>
            
            <div className="posts">
                <div className="scrolling-posts">
                    <h1>Relevant Posts</h1>
                    {posts.map(post => (
                        <ReactPlayer key={post.name} width="100%" height={"100%"} controls url="https://youtube/-TkoO8Z07hI?si=-FDcM0yFkPFqqWk_"></ReactPlayer>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HashtagPage