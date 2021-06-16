export interface PhotosResponse {
  photos: PhotosModel;
  stat: string;
}

export interface PhotosModel {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: PhotoModel[];
}

export interface PhotoModel {
  farm?: number;
  id: string;
  isfamily?: number;
  isfriend?: number;
  ispublic?: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}
