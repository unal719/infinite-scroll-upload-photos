import React, { useCallback, useEffect, useRef, useState } from "react";
import { getPhotos } from "../shared/PhotosService";
import PhotoItem from "./PhotoItem";
import PhotoLastItem from "./PhotoLastItem";

export interface PhotosProps {}

const Photos = () => {
  const [pictures, setPictures] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchMore, setFetchMore] = useState(false);
  const observer = useRef<any>();
  const lastPhotoItem = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage(page + 1);
        }
      });
      if (node) {
        observer?.current.observe(node);
      }
    },
    [loading]
  );

  useEffect(() => {
    setLoading(true);
    getPhotos(page)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          setPictures([...pictures, ...result.photos.photo]);
        },
        (error) => {}
      );
  }, [page]);
  return (
    <div className="images-container">
      <ul className="images-list">
        {pictures.map((picture, index) => {
          const { id } = picture;
          if (pictures.length === index + 1) {
            return (
              <PhotoLastItem
                key={`${id}_${index}`}
                {...picture}
                getLastPhotoItem={lastPhotoItem}
              />
            );
          } else {
            return <PhotoItem key={`${id}_${index}`} {...picture} />;
          }
        })}
      </ul>
    </div>
  );
};

export default Photos;
