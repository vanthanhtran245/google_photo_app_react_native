import {IVideoMediaItemTypes} from '../types/video';

export const getVideoFileName = (mediaItem: IVideoMediaItemTypes): string => {
  const type = mediaItem.mimeType.split('/')[1];
  return `${mediaItem.id}.${type}`;
};
