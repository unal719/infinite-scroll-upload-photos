import React, { useCallback, useEffect, useRef, useState } from "react";
import { getPhotos } from "../shared/PhotosService";
import { PhotosResponse, PhotoModel } from "../shared/ResponseModels";
import PhotoItem from "./PhotoItem";
import PhotoLastItem from "./PhotoLastItem";

export interface PhotosProps {}

const Photos = () => {
  const [photos, setPhotos] = useState<PhotoModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchMore, setFetchMore] = useState<boolean>(true);
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
        if (entries[0].isIntersecting && fetchMore) {
          setPage(page + 1);
        }
      });
      if (node) {
        observer?.current.observe(node);
      }
    },
    [loading, fetchMore]
  );

  useEffect(() => {
    setLoading(true);
    getPhotos(page)
      .then((res) => res.json())
      .then((result: PhotosResponse) => {
        try {
          // set total page
          if (page === 1) {
            setPages(result.photos.pages);
          }
          // check total page is equal for current page
          if (page === pages) {
            setFetchMore(false);
          }

          // loading for api call
          setLoading(false);
          setPhotos([...photos, ...result.photos.photo]);
        } catch (error: unknown) {
          console.log(error);
        }
      });
  }, [page]);

  return (
    <div className="images-container">
      <ul className="images-list">
        {photos.map((photo: PhotoModel, index: number) => {
          const { id } = photo;
          if (photos.length === index + 1) {
            return (
              <PhotoLastItem
                key={`${id}_${index}`}
                {...photo}
                getLastPhotoItem={lastPhotoItem}
              />
            );
          } else {
            return <PhotoItem key={`${id}_${index}`} {...photo} />;
          }
        })}
      </ul>
    </div>
  );
};

export default Photos;
