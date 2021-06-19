export const getPhotos = (page: number) => {
  const loadPhotosQueryParamUrl =
    "?method=flickr.photos.getRecent&per_page=25&format=json&nojsoncallback=1";
  return fetch(
    `${process.env.REACT_APP_API_BASE_URL}${loadPhotosQueryParamUrl}&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&page=${page}`
  ).then((res) => res.json());
};
