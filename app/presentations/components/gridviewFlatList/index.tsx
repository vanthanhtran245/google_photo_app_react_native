import {FlatList} from 'native-base';
import {Dimensions} from 'react-native';
import {IAlbum} from '../../../types/albums';
import {IMediaItemTypes} from '../../../types/media';
import {AlbumItem} from '../album';
import {MediaItem} from '../media';
import React from 'react';

interface IGridViewFlatListProps {
  data: Array<IMediaItemTypes | IAlbum>;
  fetchMore: () => void;
  numColumns: number;
  itemOnPressed: (item: IMediaItemTypes | IAlbum) => void;
}

const GridViewFlatList = ({
  data,
  fetchMore,
  numColumns,
  itemOnPressed,
}: IGridViewFlatListProps) => {
  const {width} = Dimensions.get('screen');
  const itemSize = (width * 0.92) / numColumns;

  const renderMediaItem = (item: IMediaItemTypes) => {
    return (
      <MediaItem
        onPressed={() => itemOnPressed(item)}
        item={item}
        size={itemSize}
      />
    );
  };
  const renderAlbumItem = (item: IAlbum) => {
    return (
      <AlbumItem
        onPressed={() => itemOnPressed(item)}
        item={item}
        size={itemSize}
      />
    );
  };

  const isAlbum = (item: any): item is IAlbum => {
    return (
      item.mediaItemsCount !== undefined || item.coverPhotoBaseUrl !== undefined
    );
  };

  return (
    <FlatList<IMediaItemTypes | IAlbum>
      flex={1}
      data={data}
      paddingTop="3"
      paddingBottom="4"
      onEndReachedThreshold={0.5}
      onEndReached={fetchMore}
      numColumns={numColumns}
      columnWrapperStyle={{
        flex: 1,
        marginVertical: 4,
        justifyContent: 'space-around',
      }}
      renderItem={({item}) => {
        if (isAlbum(item)) {
          return renderAlbumItem(item as IAlbum);
        }
        return renderMediaItem(item as IMediaItemTypes);
      }}
    />
  );
};

export {GridViewFlatList};
