import {Image, Pressable, View, Center, Heading} from 'native-base';
import {IAlbum} from '../../../types/albums';
import {primaryBorderColor} from '../../../styles/colors';

interface IAlbumProps {
  item: IAlbum;
  size: number;
  onPressed: () => void;
}
const AlbumItem = ({item, size, onPressed}: IAlbumProps) => {
  return (
    <View key={item.id} alignItems="center" justifyContent="center">
      <Pressable onPress={onPressed}>
        <Image
          alt="album cover"
          width={size}
          height={size}
          borderRadius={'md'}
          borderWidth={'0.15'}
          borderColor={primaryBorderColor}
          source={{
            uri: item.coverPhotoBaseUrl,
            cache: 'force-cache',
          }}
        />
        <Center paddingTop={2} paddingBottom={4}>
          <Heading size={'xs'} letterSpacing={'lg'}>
            {item.title}
          </Heading>
        </Center>
      </Pressable>
    </View>
  );
};
export {AlbumItem};
