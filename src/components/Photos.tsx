import React, { useCallback, useEffect, useRef, useState } from "react";
import { getPhotos } from "../shared/PhotosService";
import { PhotosResponse, PhotoModel } from "../shared/ResponseModels";
import PhotoItem from "./PhotoItem";
import FavoritePhotos from "./FavoritePhotos";

export interface PhotosProps {}

const Photos = () => {
  const [photos, setPhotos] = useState<PhotoModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFavorite, setShowFavorite] = useState<boolean>(false);
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
    getPhotos(page).then((result: PhotosResponse) => {
      try {
        // check total page is equal for current page
        if (page === result.photos.pages) {
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

  const handleFavoritesClick = () => {
    setShowFavorite(!showFavorite);
  };

  return (
    <>
      <div className="images-container">
        <button className="show-favorites" onClick={handleFavoritesClick}>
          Show Favorites
        </button>
        <ul className="images-list">
          {photos.map((photo: PhotoModel, index: number) => {
            const { id } = photo;

            return (
              <PhotoItem
                key={`${id}_${index}`}
                {...photo}
                lastPhoto={photos.length === index + 1 ? lastPhotoItem : null}
              />
            );
          })}
        </ul>
      </div>

      {showFavorite && (
        <FavoritePhotos handleModalClose={handleFavoritesClick} />
      )}
    </>
  );
};

export default Photos;
