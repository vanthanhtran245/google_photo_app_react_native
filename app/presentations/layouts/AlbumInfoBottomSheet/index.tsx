import React, {useRef, useMemo, useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {IAlbum} from '../../../types/albums';
import {Pressable, View} from 'native-base';

interface IAlbumItemsBottomSheetProps {
  onSelectAlbum: (IAlbum) => void;
  onClose: () => void;
  albums: Array<IAlbum>;
  size: '40%' | '25%';
}

const AlbumsItemSheet = ({
  onSelectAlbum,
  onClose,
  albums,
  size,
}: IAlbumItemsBottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [size], []);

  const renderItem = useCallback(
    ({item}) => (
      <View key={item.id} style={styles.itemContainer}>
        <Pressable onPress={onSelectAlbum(item)} />
        <Text marginTop={1} marginBottom={3} fontSize={'sm'}>
          {item.title}
        </Text>
      </View>
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      onClose={onClose}
      snapPoints={snapPoints}>
      <BottomSheetFlatList
        data={albums}
        renderItem={renderItem}
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
