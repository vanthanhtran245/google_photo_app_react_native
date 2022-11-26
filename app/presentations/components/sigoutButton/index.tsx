import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {Button} from 'native-base';
import {Dimensions} from 'react-native';
import {useAuth} from '../../../hooks/useAuth';
import i18n from '../../../utils/translations_utilities';

const SignOutButton = () => {
  const {signOut} = useAuth();
  const {dismiss} = useBottomSheetModal();
  const {width} = Dimensions.get('screen');

  return (
    <Button
      variant="link"
      width={width * 0.3}
      onPress={() => {
        dismiss();
        signOut();
      }}>
      {i18n.t('sign_out_button_title')}
    </Button>
  );
};

export {SignOutButton};
