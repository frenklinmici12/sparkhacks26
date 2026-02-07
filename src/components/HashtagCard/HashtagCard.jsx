import { Link } from 'react-router-dom';
import './HashtagCard.css'; 

function HashtagCard({ hashtag }) {
  return (
    <Link to={`/hashtag/${hashtag.name}`} className='hashtag-card'>
        <img src={hashtag.background_image} alt={hashtag.name}/>
        <p>{"#" + hashtag.name}</p>
    </Link>
  );
}

export default HashtagCard;
