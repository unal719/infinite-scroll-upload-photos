export const getPhotos = (page: number) => {
  return fetch(
    `${process.env.REACT_APP_API_BASE_URL}&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&page=${page}`
  );
};
