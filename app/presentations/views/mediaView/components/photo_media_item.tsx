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
import {PhotoMediaItemInfoBottomSheet} from '../../../layouts/PhotoMediaItemInfoBottomSheet';
import {AlbumsItemSheet} from '../../../layouts/AlbumInfoBottomSheet';
import {IAlbum} from '../../../../types/albums';
import {addMediaToAlbum} from '../../../../client/photos';
import {position} from 'native-base/lib/typescript/theme/styled-system';

const PhotoMediaItem = ({
  mediaItem,
  albums,
}: {
  mediaItem: IPhotoMediaItemTypes;
  albums: Array<IAlbum>;
}) => {
  const {width} = useWindowDimensions();
  const [infoSheet, setInfoSheet] = useState(false);
  const [showAlbums, setshowAlbums] = useState(false);
  const navigation = useNavigation();

  const aspectRatio = getAspectRatio(
    Number.parseFloat(mediaItem.mediaMetadata.height),
    Number.parseFloat(mediaItem.mediaMetadata.width),
  );

  const saveImageToGallery = async () => {
    const res = await savePicture(mediaItem);
    if (res) {
      Toast.show({
        text1: 'Image saved!',
        position: 'bottom',
      });
    } else {
      Toast.show({
        text1: 'An error occur during time request',
        position: 'top',
        type: 'error',
      });
    }
  };

  const addPhotoToAlbum = async (album: IAlbum) => {
    await addMediaToAlbum({
      mediaId: mediaItem.id,
      albumId: album.id,
    });
    Toast.show({
      text1: 'Image added to album!',
      position: 'bottom',
    });
  };

  const showInfo = () => {
    setInfoSheet(true);
  };

  const showSelectAlbum = () => {
    setshowAlbums(true);
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
            onPress={showSelectAlbum}>
            <Icon name="add" style={styles.backIconStyle} />
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

        {showAlbums && (
          <AlbumsItemSheet
            onClose={() => {
              setshowAlbums(false);
            }}
            albums={albums}
            onSelectAlbum={album => {
              setshowAlbums(false);
              addPhotoToAlbum(album);
            }}
            size={'25%'}
          />
        )}

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
