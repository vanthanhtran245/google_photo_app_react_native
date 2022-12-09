import {RouteProp, useRoute} from '@react-navigation/native';
import {Center, View, ZStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  IAlbumsStackParamList,
  IPhotosStackParamList,
  ISharedAlbumsStackParamList,
} from '../../../types/navigation';

import {IPhotoMediaItemTypes} from '../../../types/photo';
import {IVideoMediaItemTypes} from '../../../types/video';
import {getPhotoMediaItem, getVideoMediaItem} from '../../../client/photos';
import {checkMediaType} from '../../../utils/checkMediaType';
import {CircularLoader} from '../../components/loading';
import {MediaPreview} from './components/media_preview';
import {PhotoMediaItem} from './components/photo_media_item';
import {VideoMediaItem} from './components/video_media_item';

const MediaView = () => {
  const route =
    useRoute<
      RouteProp<
        | IPhotosStackParamList
        | ISharedAlbumsStackParamList
        | IAlbumsStackParamList,
        'MediaView'
      >
    >();

  const mediaItem = route.params.mediaItem;
  const albums = route.params.albums;
  console.log(albums);
  const [extendedMediaItem, setExtendedMediaItem] = useState<
    IVideoMediaItemTypes | IPhotoMediaItemTypes | null
  >(null);

  const typeOfMedia = checkMediaType(mediaItem.mimeType);

  const getMedia = async () => {
    if (typeOfMedia === 'Photo') {
      const res = await getPhotoMediaItem({
        mediaId: mediaItem.id,
      });
      setExtendedMediaItem(res);
    } else {
      const res = await getVideoMediaItem({
        mediaId: mediaItem.id,
      });
      setExtendedMediaItem(res);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  /// If Media is loading, Show MediaPreview
  if (extendedMediaItem === null) {
    return (
      <View flex={1} alignItems="center" justifyContent={'center'}>
        <ZStack alignItems="center" justifyContent="center">
          <MediaPreview mediaItem={mediaItem} />
          <Center zIndex={3}>
            <CircularLoader color="black" size="lg" />
          </Center>
        </ZStack>
      </View>
    );
  } else if (typeOfMedia === 'Photo') {
    return (
      <View flex={1} alignItems="center" justifyContent={'center'}>
        <PhotoMediaItem
          mediaItem={extendedMediaItem as IPhotoMediaItemTypes}
          albums={albums.albums}
        />
      </View>
    );
  } else {
    return (
      <View flex={1} alignItems="center" justifyContent={'center'}>
        <VideoMediaItem mediaItem={extendedMediaItem as IVideoMediaItemTypes} />
      </View>
    );
  }
};

export {MediaView};
