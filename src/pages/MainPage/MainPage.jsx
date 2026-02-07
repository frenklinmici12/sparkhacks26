import { Link } from "react-router-dom"
import { useState } from "react";

import './MainPage.css'
import HashtagCard from "../../components/HashtagCard/HashtagCard";

function MainPage() {
    //const [lifestyleHashtags, setLifestyleHashtags] = useState([]) // ideally use a state and fetch hastag data from backend

    const lifestyleHashtags = [
        { name: "fitness", background_image: "https://hips.hearstapps.com/hmg-prod/images/701/articles/2017/01/how-much-joining-gym-helps-health-2-jpg-1488906648.jpeg?resize=640:*"},
        { name: "travel", background_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"},
        { name: "food", background_image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"},
        { name: "wellness", background_image: "https://globalwellnessinstitute.org/wp-content/uploads/2019/05/wellnessinfographic-300x300.png"},
        { name: "nature", background_image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
        { name: "pets", background_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS0IQhVr9DDJCq61QX28zCoiqDrvezBh5ylw&s" }
    ];

    const creativityHashtags = [
        { name: "art", background_image: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=400&q=80" },
        { name: "music", background_image: "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=400&q=80" },
        { name: "filmmaking", background_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQpqi6kH-7FB_7ZzN03mNEAQwr9V4dGjKxgQ&s"},
        { name: "acting", background_image: "https://www.careersinfilm.com/wp-content/uploads/2022/11/acting-auditions.jpg"},
        { name: "technology", background_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80" },
        { name: "writing", background_image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80" },
        { name: "illustration", background_image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=400&q=80" },
        { name: "animation", background_image: "https://i.ytimg.com/vi/VmekmH0QJMs/maxresdefault.jpg" }

    ]

    const entertainmentHashtags = [
        { name: "gaming", background_image: "https://i0.wp.com/newdigitalage.co/wp-content/uploads/2022/06/iStock-1334436084-jpg.webp?fit=1024%2C683&ssl=1" },
        { name: "books", background_image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
        { name: "tv shows", background_image: "https://images.bauerhosting.com/empire/2024/04/100-Greatest-TV-Shows-Update.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=1440&q=80" },
        { name: "anime", background_image: "https://sm.ign.com/ign_nordic/lists/t/the-top-25/the-top-25-greatest-anime-characters-of-all-time_8jku.jpg" },
        { name: "sports", background_image: "https://rockytopsportsworld.com/wp-content/uploads/2019/07/sports-balls.jpg" },
        { name: "live streaming", background_image: "https://i.insider.com/5d52c0d4cd9784094b0b8cbc?width=1200&format=jpeg" },
        { name: "esports", background_image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80" },
        { name: "comedy", background_image: "https://images.ctfassets.net/qpn1gztbusu2/4BsKgtvBG2He4AeZQz5afS/2f60b1e3c59e6d1a1cfcdc8e9cedd8d8/best-comedy-audiobooks-social.jpg" },
        { name: "movies", background_image: "https://www.wondermind.com/wp-content/uploads/2024/09/20-Feel-Good-Movies-People-Swear-By-For-Your-Next-Bad-Day.jpg?w=960" }
    ]

    return (
        <>
            <div>
                <h2>Lifestyle</h2>
                <div className="carousel">
                    {lifestyleHashtags.map(hashtag => (
                        <HashtagCard key={hashtag} hashtag={hashtag}></HashtagCard>
                        ))}
                </div>
            </div>
            <div>
                <h2>Creativity</h2>
                <div className="carousel">
                    {creativityHashtags.map(hashtag => (
                        <HashtagCard key={hashtag} hashtag={hashtag}></HashtagCard>
                        ))}
                </div>
            </div>
            <div>
                <h2>Entertainment</h2>
                <div className="carousel">
                    {entertainmentHashtags.map(hashtag => (
                        <HashtagCard key={hashtag} hashtag={hashtag}></HashtagCard>
                        ))}
                </div>
            </div>
        </>
    )
}

export default MainPage