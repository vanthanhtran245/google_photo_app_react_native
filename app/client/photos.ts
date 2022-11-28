import {photoClient} from './client';
import {getTokens} from '../utils/getAccessToken';
import {IAlbum} from '../types/albums';
import {IMediaItemTypes} from '../types/media';
import {IPhotoMediaItemTypes} from '../types/photo';
import {IVideoMediaItemTypes} from '../types/video';
import {
  TGetAlbumsResponseTypes,
  TGetAlbumsSearchTypes,
  TGetMediaItemsResponseTypes,
  TGetSharedAlbumsResponseTypes,
} from './photo.types';
import {statusCodes} from '@react-native-google-signin/google-signin';

/**
 * Gets albums of user.
 *
 * @param pageSize numbers of albums to be fetched.
 * @param pageToken token to be fetched next elements provided by server.
 * @returns array of albums or empty array.
 * @returns token to be fetched next elements.
 */
const getAlbums = async ({
  pageToken,
  pageSize = '25',
}: {
  pageToken?: string;
  pageSize?: string;
} = {}): Promise<{albums: Array<IAlbum>; nextPageToken?: string}> => {
  try {
    const tokens = await getTokens();

    if (tokens === null) {
      return {
        albums: [],
      };
    }
    const client = await photoClient(tokens.accessToken);
    const res = await client.get<TGetAlbumsResponseTypes>('/albums', {
      params: {
        pageSize: pageSize,
        pageToken: pageToken,
      },
    });
    if (res.data.albums) {
      return {
        albums: res.data.albums,
        nextPageToken: res.data.nextPageToken,
      };
    }
    return {
      albums: [],
    };
  } catch (error: any) {
    console.log(error);
    return {
      albums: [],
    };
  }
};
/**
 * Gets albums of user.
 *
 * @param pageSize numbers of albums to be fetched.
 * @param pageToken token to be fetched next elements provided by server.
 * @returns array of albums or empty array.
 * @returns token to be fetched next elements.
 */
const getSharedAlbums = async ({
  pageToken,
  pageSize = '25',
}: {
  pageToken?: string;
  pageSize?: string;
} = {}): Promise<{albums: Array<IAlbum>; nextPageToken?: string}> => {
  try {
    const tokens = await getTokens();

    if (tokens === null) {
      return {
        albums: [],
      };
    }
    const client = await photoClient(tokens.accessToken);
    const res = await client.get<TGetSharedAlbumsResponseTypes>(
      '/sharedAlbums',
      {
        params: {
          pageSize: pageSize,
          pageToken: pageToken,
        },
      },
    );
    if (res.data.sharedAlbums) {
      return {
        albums: res.data.sharedAlbums,
        nextPageToken: res.data.nextPageToken,
      };
    }
    return {
      albums: [],
    };
  } catch (error: any) {
    console.log(error);
    return {
      albums: [],
    };
  }
};

/**
 * Gets library contents  of the user.
 *
 * @param pageSize numbers of contents to be fetched.
 * @param pageToken token to be fetched next elements provided by server.
 * @returns array of contents or empty array.
 * @returns token to be fetched next elements.
 */
const getLibraryContents = async ({
  pageToken,
  pageSize = '100',
}: {
  pageToken?: string;
  pageSize?: string;
} = {}): Promise<{
  contents: Array<IMediaItemTypes>;
  nextPageToken?: string;
}> => {
  try {
    const tokens = await getTokens();

    if (tokens === null) {
      return {
        contents: [],
      };
    }
    const client = await photoClient(tokens.accessToken);
    const res = await client.get<TGetMediaItemsResponseTypes>('/mediaItems', {
      params: {
        pageSize: pageSize,
        pageToken: pageToken,
      },
    });
    if (res.data.mediaItems) {
      return {
        contents: res.data.mediaItems,
        nextPageToken: res.data.nextPageToken,
      };
    }
    return {
      contents: [],
    };
  } catch (error: any) {
    console.log(error);
    return {
      contents: [],
    };
  }
};
/**
 * Gets library contents  of the user.
 *
 * @param albumId album's id
 * @param pageSize numbers of contents to be fetched.
 * @param pageToken token to be fetched next elements provided by server.
 * @returns array of contents or empty array.
 * @returns token to be fetched next elements.
 */
const getAlbumsContent = async ({
  albumId,
  pageToken,
  pageSize = '100',
}: {
  pageToken?: string;
  albumId: string;
  pageSize?: string;
}): Promise<{
  contents: Array<IMediaItemTypes>;
  nextPageToken?: string;
}> => {
  try {
    const tokens = await getTokens();

    if (tokens === null) {
      return {
        contents: [],
      };
    }
    const client = await photoClient(tokens.accessToken);
    const res = await client.post<TGetAlbumsSearchTypes>('/mediaItems:search', {
      albumId: albumId,
      pageSize: pageSize,
      pageToken: pageToken,
    });
    if (res.data.mediaItems) {
      return {
        contents: res.data.mediaItems,
        nextPageToken: res.data.nextPageToken,
      };
    }
    return {
      contents: [],
    };
  } catch (error: any) {
    console.log(error);
    return {
      contents: [],
    };
  }
};
/**
 * Gets photo media item data.
 * @param mediaId content's id.
 * @returns token to be fetched next elements.
 */
const getPhotoMediaItem = async ({
  mediaId,
}: {
  mediaId: string;
}): Promise<IPhotoMediaItemTypes | null> => {
  try {
    const tokens = await getTokens();

    if (tokens === null) {
      return null;
    }
    const client = await photoClient(tokens.accessToken);
    const res = await client.get(`/mediaItems/${mediaId}`);

    if (res.data.mediaMetadata.photo) {
      return res.data;
    }
    return null;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

/**
 * Gets video media item data.
 * @param mediaId content's id.
 * @returns token to be fetched next elements.
 */
const getVideoMediaItem = async ({
  mediaId,
}: {
  mediaId: string;
}): Promise<IVideoMediaItemTypes | null> => {
  try {
    const tokens = await getTokens();

    if (tokens === null) {
      return null;
    }
    const client = await photoClient(tokens.accessToken);
    const res = await client.get(`/mediaItems/${mediaId}`);

    if (res.data.mediaMetadata.video) {
      return res.data;
    }
    return null;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const getVideoMediaItemHeader = async () => {
  const tokens = await getTokens();
  if (tokens === null) {
    return null;
  }

  return {
    accept: 'video/*',
    authorization: 'Bearer ' + tokens?.accessToken,
  };
};

const addMediaToAlbum = async ({
  mediaId,
  albumId,
}: {
  mediaId: string;
  albumId: string;
}): Promise<Boolean | null> => {
  try {
    const tokens = await getTokens();

    if (tokens === null) {
      return null;
    }
    const client = await photoClient(tokens.accessToken);
    const pathURL = `albums/${albumId}:batchAddMediaItems`;
    const request = {mediaItemIds: [mediaId]};
    const res = await client.post(pathURL, {
      request,
    });

    if (res.status) {
      return true;
    }
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

export {
  getAlbums,
  getSharedAlbums,
  getLibraryContents,
  getAlbumsContent,
  getPhotoMediaItem,
  getVideoMediaItem,
  getVideoMediaItemHeader,
  addMediaToAlbum,
};
