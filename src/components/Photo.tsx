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
        className=""
        alt="logo"
      />
      <div className="overlay-container">
        <h4>{title}</h4>
        <button className="add-favorite">Fovarite </button>
      </div>
    </>
  );
};

export default Photo;
