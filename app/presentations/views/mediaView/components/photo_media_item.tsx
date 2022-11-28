import {useNavigation} from '@react-navigation/native';
import {View} from 'native-base';
import Toast from 'react-native-toast-message';
import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IPhotoMediaItemTypes} from '../../../../types/photo';
import {savePicture} from '../../../../services/photo';
import {getAspectRatio} from '../../../../utils/getAspectRatio';
import {addMediaToAlbum, getAlbums} from '../../../../client/photos';
import {PhotoMediaItemInfoBottomSheet} from '../../../layouts/PhotoMediaItemInfoBottomSheet';
import {AlbumsItemSheet} from '../../../layouts/AlbumInfoBottomSheet';
import {IAlbum} from '../../../../types/albums';

const PhotoMediaItem = ({mediaItem}: {mediaItem: IPhotoMediaItemTypes}) => {
  const {width} = useWindowDimensions();
  const [infoSheet, setInfoSheet] = useState(false);
  const [showAlbums, setAlbumsSheet] = useState([]);
  const navigation = useNavigation();

  const aspectRatio = getAspectRatio(
    Number.parseFloat(mediaItem.mediaMetadata.height),
    Number.parseFloat(mediaItem.mediaMetadata.width),
  );

  const saveImageToGallery = async () => {
    await savePicture(mediaItem);
    Toast.show({
      text1: 'Image saved!',
      position: 'bottom',
    });
  };

  //TODO: Handle add media to albums
  // const addMediaItemToAlbum = async () => {
  //   const album = await getAlbums();
  //   const albumId = album.albums[0].id;
  //   await addMediaToAlbum({
  //     mediaId: mediaItem.id,
  //     albumId: albumId,
  //   });
  //   Toast.show({
  //     text1: 'Image added to album!',
  //     position: 'bottom',
  //   });
  // };

  const showInfo = () => {
    setInfoSheet(true);
  };

  const renderFunctionalityButtons = () => {
    return (
      <View style={styles.iconBarStyle} width={width}>
        <TouchableOpacity
          style={styles.iconPressableStyle}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" style={styles.backIconStyle} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.iconPressableStyle}
            onPress={saveImageToGallery}>
            <Icon name="cloud-download" style={styles.backIconStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconPressableStyle}
            onPress={showInfo}>
            <Icon name="info-outline" style={styles.backIconStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View width={width} height={width * aspectRatio}>
      <Modal visible={true} transparent={true}>
        <ImageViewer
          renderIndicator={() => <View />}
          maxOverflow={0}
          style={{
            width: width,
            height: width * aspectRatio,
            alignSelf: 'center',
          }}
          imageUrls={[{url: mediaItem.baseUrl}]}
        />

        {infoSheet && (
          <PhotoMediaItemInfoBottomSheet
            mediaItem={mediaItem}
            onClose={() => {
              setInfoSheet(false);
            }}
            size={'25%'}
          />
        )}

        {/*{infoSheet && (*/}
        {/*  <AlbumsItemSheet*/}
        {/*    albums={await getAlbums}*/}
        {/*    onClose={() => {*/}
        {/*      setInfoSheet(false);*/}
        {/*    }}*/}
        {/*    size={'25%'}*/}
        {/*  />*/}
        {/*)}*/}

        <Toast />
        {renderFunctionalityButtons()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  iconBarStyle: {
    position: 'absolute',
    zIndex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
  },
  iconPressableStyle: {
    padding: 15,
  },
  backIconStyle: {
    color: 'white',
    elevation: 5,
    fontSize: 26,
  },
});

export {PhotoMediaItem};
