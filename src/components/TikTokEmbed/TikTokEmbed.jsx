const TikTokEmbed = ({ url }) => {
  return (
    <div style={{ maxWidth: "325px", margin: "20px auto" }}>
      <iframe
        src={`https://www.tiktok.com/embed/${url.split("/video/")[1]}`}
        width="325"
        height="575"
        frameBorder="0"
        allowFullScreen
        title="TikTok Video"
      ></iframe>
    </div>
  );
};

export default TikTokEmbed;