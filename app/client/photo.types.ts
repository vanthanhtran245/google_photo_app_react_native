import {IAlbum} from '../types/albums';
import {IMediaItemTypes} from '../types/media';

type TGetMediaItemsResponseTypes = {
  mediaItems: Array<IMediaItemTypes>;
  nextPageToken?: string;
};

type TGetAlbumsResponseTypes = {
  albums: Array<IAlbum>;
  nextPageToken?: string;
};

type TGetSharedAlbumsResponseTypes = {
  sharedAlbums: Array<IAlbum>;
  nextPageToken?: string;
};

type TGetAlbumsSearchTypes = {
  mediaItems: Array<IMediaItemTypes>;
  nextPageToken?: string;
};

export {
  TGetMediaItemsResponseTypes,
  TGetAlbumsResponseTypes,
  TGetSharedAlbumsResponseTypes,
  TGetAlbumsSearchTypes,
};
