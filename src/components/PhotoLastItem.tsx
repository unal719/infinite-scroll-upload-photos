import React, { useEffect } from "react";
import Photo, { PhotoProps } from "./Photo";

export interface PhotoLastItemProps extends PhotoProps {
  getLastPhotoItem: any;
}

const PhotoLastItem = ({
  id,
  secret,
  server,
  title,
  getLastPhotoItem,
}: PhotoLastItemProps) => {
  useEffect(() => {
    debugger;
    console.log(getLastPhotoItem);
  }, [getLastPhotoItem]);
  return (
    <li className="image-item" ref={getLastPhotoItem}>
      <Photo {...{ id, secret, server, title }} />
    </li>
  );
};

export default PhotoLastItem;
