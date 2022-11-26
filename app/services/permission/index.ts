import {PermissionsAndroid} from 'react-native';
import {iosRequestAddOnlyGalleryPermission} from '@react-native-camera-roll/camera-roll';

async function hasiOSPermission(): Promise<boolean> {
  const hasPermission = await iosRequestAddOnlyGalleryPermission();
  return hasPermission === 'granted' || hasPermission === 'limited';
}

async function hasAndroidPermission(): Promise<boolean> {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export {hasiOSPermission, hasAndroidPermission};
