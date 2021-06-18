import React from "react";
import { checkExistCookie, resetCookieByName } from "../shared/Helper";
import { PhotoModel } from "../shared/ResponseModels";
import PhotoItem from "./PhotoItem";

const FavoritePhotos = ({ handleModalClose }: any) => {
  const existCookieValue = checkExistCookie("favoritePhotos");
  const resetFavorites = () => {
    resetCookieByName("favoritePhotos");
    handleModalClose();
  };
  return (
    <div className="favorite-photos-container">
      <div className="modal-content">
        <div className="header-nav">
          <button className="clear-favorites" onClick={resetFavorites}>
            Remove All
          </button>
          <button className="close-button" onClick={handleModalClose}>
            <i className="icon-logo"></i>
          </button>
        </div>
        {existCookieValue && existCookieValue !== null ? (
          <ul className="images-list">
            {existCookieValue.map((photo: PhotoModel, index: number) => {
              const { id } = photo;
              return (
                <PhotoItem
                  key={`${id}_${index}`}
                  {...photo}
                  viewType={`favorite`}
                />
              );
            })}
          </ul>
        ) : (
          <h4>Start select favorite Photo...</h4>
        )}
      </div>
    </div>
  );
};

export default FavoritePhotos;
