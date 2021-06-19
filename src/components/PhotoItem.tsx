import React from "react";
import Photo, { PhotoProps } from "./Photo";

const PhotoItem = (photoItem: PhotoProps) => {
  return (
    <li className="image-item" ref={photoItem.lastPhoto}>
      <Photo {...photoItem} />
    </li>
  );
};

export default PhotoItem;
