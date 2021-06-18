import React, { useEffect, useState } from "react";
import { checkExistCookie, setCookie } from "../shared/Helper";

export interface PhotoProps {
  id: string;
  server: string;
  secret: string;
  title: string;
  viewType?: string;
}

const Photo = ({ id, server, secret, title, viewType }: PhotoProps) => {
  const [isExist, setExistStatus] = useState<boolean>(false);

  const handleFavoritePhoto = () => {
    const favoritePhoto = [
      {
        id,
        server,
        secret,
        title,
      },
    ];

    setCookie("favoritePhotos", JSON.stringify(favoritePhoto));
    setExistStatus(true);
  };

  useEffect(() => {
    if (viewType && viewType === "favorite") {
      setExistStatus(true);
      return;
    }
    const existCookieValue = checkExistCookie("favoritePhotos");
    if (!existCookieValue) {
      setExistStatus(false);
    } else {
      existCookieValue.forEach((item: any) => {
        if (item.id === id) {
          setExistStatus(true);
        } else {
          setExistStatus(false);
        }
      });
    }
  }, [id]);

  return (
    <>
      <img
        src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
        className="photo"
        alt="photo"
      />
      <div className="overlay-container">
        <span className="photo-title">{title}</span>
        {!isExist && (
          <button className="add-favorite" onClick={handleFavoritePhoto}>
            <span>Favorite</span>

            <i className="add-logo"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default Photo;
