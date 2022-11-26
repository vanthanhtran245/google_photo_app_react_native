import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Platform} from 'react-native';
// @ts-ignore
import RNFS from 'react-native-fs';
import {IPhotoMediaItemTypes} from '../../types/photo';
import {hasAndroidPermission, hasiOSPermission} from '../permission';

async function savePicture(media: IPhotoMediaItemTypes): Promise<boolean> {
  try {
    if (Platform.OS === 'android' && (await hasAndroidPermission())) {
      const tag = `${RNFS.DocumentDirectoryPath}/${media.filename}`;
      await RNFS.downloadFile({
        fromUrl: media.baseUrl,
        toFile: tag,
      }).promise;
      await CameraRoll.save(tag, {
        type: 'photo',
      });
    } else if (Platform.OS === 'ios' && (await hasiOSPermission())) {
      const tag = media.baseUrl;
      await CameraRoll.save(tag, {
        type: 'photo',
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export {savePicture};
