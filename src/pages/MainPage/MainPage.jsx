import { Link } from "react-router-dom"
import { useState } from "react";

import './MainPage.css'
import HashtagCard from "../../components/HashtagCard/HashtagCard";

function MainPage() {
    //const [lifestyleHashtags, setLifestyleHashtags] = useState([])

    const lifestyleHashtags = [
        {
            name: "Fitness",
            background_image: "https://hips.hearstapps.com/hmg-prod/images/701/articles/2017/01/how-much-joining-gym-helps-health-2-jpg-1488906648.jpeg?resize=640:*"
        },
        {
            name: "Travel",
            background_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Food",
            background_image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Wellness",
            background_image: "https://globalwellnessinstitute.org/wp-content/uploads/2019/05/wellnessinfographic-300x300.png"
        },
        { name: "Fashion", background_image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=400&q=80" },
        { name: "Photography", background_image: "https://images.unsplash.com/photo-1519183071298-a2962ed6d8c4?auto=format&fit=crop&w=400&q=80" },
        { name: "Art", background_image: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=400&q=80" },
        { name: "Music", background_image: "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=400&q=80" },
        { name: "Gaming", background_image: "https://images.unsplash.com/photo-1605902711622-cfb43c4430b2?auto=format&fit=crop&w=400&q=80" },
        { name: "Technology", background_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80" },
        { name: "Books", background_image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
        { name: "Nature", background_image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
        { name: "Pets", background_image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=400&q=80" }
    ];

   

    return (
        <div>
            <div>
                <h2>Lifestyle</h2>
                <div className="carousel">
                    {lifestyleHashtags.map(hashtag => (
                       <HashtagCard hashtag={hashtag}></HashtagCard>
                        ))}
                </div>
            </div>
        </div>

        
    )
}

export default MainPage