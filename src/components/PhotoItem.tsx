import React, { useCallback, useEffect, useRef, useState } from "react";
import Photo, { PhotoProps } from "./Photo";

const PhotoItem = (photoItem: PhotoProps) => {
  return (
    <li className="image-item">
      <Photo {...photoItem} />
    </li>
  );
};

export default PhotoItem;