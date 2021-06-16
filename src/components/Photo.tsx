import React from "react";

export interface PhotoProps {
  id: string;
  server: string;
  secret: string;
  title: string;
}

const Photo = ({ id, server, secret, title }: PhotoProps) => {
  return (
    <>
      <img
        src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
        className="photo"
        alt="photo"
      />
      <div className="overlay-container">
        <span className="photo-title">{title}</span>
        <button className="add-favorite">Fovarite </button>
      </div>
    </>
  );
};

export default Photo;
