import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IAlbum} from './albums';
import {IMediaItemTypes} from './media';
import {TGetAlbumsResponseTypes} from '../client/photo.types';

// Login Stack
export type TLoginScreenParamsList = {};

export type TLoginStackParamList = {
  Login: TLoginScreenParamsList;
};

// Photo Stack Navigation Props
export type TLoginRootStackProps = NativeStackNavigationProp<
  TLoginStackParamList,
  'Login'
>;

/*------------------------------------------------------*/

// Screens
export type TPhotosScreenParamsList = {};
export type TMediaViewScreenParamsList = {
  mediaItem: IMediaItemTypes;
  albums: TGetAlbumsResponseTypes;
};
export type TAlbumsParamsList = {};
export type TSharedAlbumsParamsList = {};
export type TAlbumsContentScreenParamsList = {
  album: IAlbum;
};

/// Photo Stack
export type IPhotosStackParamList = {
  Photos: TPhotosScreenParamsList;
  MediaView: TMediaViewScreenParamsList;
};

// Photo Stack Navigation Props
export type TPhotoStackPhotosProps = NativeStackNavigationProp<
  IPhotosStackParamList,
  'Photos'
>;

export type TPhotoStackMediaViewProps = NativeStackNavigationProp<
  IPhotosStackParamList,
  'MediaView'
>;

/*------------------------------------------------------*/

/// Albums Stack
export type IAlbumsStackParamList = {
  Albums: TAlbumsParamsList;
  MediaView: TMediaViewScreenParamsList;
  AlbumsContent: TAlbumsContentScreenParamsList;
};

// Albums Stack Navigation Props
export type TAlbumsStackAlbumsProps = NativeStackNavigationProp<
  IAlbumsStackParamList,
  'Albums'
>;

export type TAlbumsStackMediaViewProps = NativeStackNavigationProp<
  IAlbumsStackParamList,
  'MediaView'
>;

export type TAlbumsStackAlbumsContentViewProps = NativeStackNavigationProp<
  IAlbumsStackParamList,
  'AlbumsContent'
>;

/*------------------------------------------------------*/

/// Shared Albums Stack
export type ISharedAlbumsStackParamList = {
  SharedAlbums: TSharedAlbumsParamsList;
  MediaView: TMediaViewScreenParamsList;
  AlbumsContent: TAlbumsContentScreenParamsList;
};

// Albums Stack Navigation Props
export type TSharedAlbumsStackSharedAlbumsProps = NativeStackNavigationProp<
  ISharedAlbumsStackParamList,
  'SharedAlbums'
>;

export type TSharedAlbumsStackMediaViewProps = NativeStackNavigationProp<
  ISharedAlbumsStackParamList,
  'MediaView'
>;

export type TSharedAlbumsStackAlbumsContentProps = NativeStackNavigationProp<
  ISharedAlbumsStackParamList,
  'AlbumsContent'
>;

// Tab Bar
export type TabParamList = {
  PhotoStack: undefined;
  AlbumsStack: undefined;
  SharedAlbumsStack: undefined;
};
