import React from "react";

const VideoCard = ({ thumbnail }) => {
  return (
    <img className="videoCard" src={thumbnail.url} alt={thumbnail.title} />
  );
};

export default VideoCard;
