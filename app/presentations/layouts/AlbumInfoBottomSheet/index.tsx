import React, {useCallback, useRef, useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {IAlbum} from '../../../types/albums';

interface IAlbumItemsBottomSheetProps {
  onClose: () => void;
  albums: [IAlbum];
  size: '40%' | '25%';
}

const AlbumsItemSheet = ({
  onClose,
  albums,
  size,
}: IAlbumItemsBottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => [size], []);
  const renderAlbumName = (album: IAlbum) => {
    return (
      <Text marginTop={1} marginBottom={3} fontSize={'sm'}>
        {album.title}
      </Text>
    );
  };

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      onClose={onClose}>
      <BottomSheetFlatList
        data={albums}
        keyExtractor={i => i}
        renderItem={renderAlbumName}
        contentContainerStyle={styles.contentContainer}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

export {AlbumsItemSheet};
