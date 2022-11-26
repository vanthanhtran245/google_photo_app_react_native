import {Box, Heading, View, VStack} from 'native-base';
import i18n from '../../../utils/translations_utilities';
import {AppLogo} from '../../components/applogo';
import {SignInButton} from '../../components/signButton';

const Login = () => {
  return (
    <View flex={1}>
      <VStack flex={1} alignItems="center">
        <Box marginTop={'8'}>
          <AppLogo size={'48'} />
        </Box>
        <Box marginTop={'12'} alignItems="center">
          <Heading
            fontWeight={'semibold'}
            maxWidth={'64'}
            textAlign="left"
            marginBottom="4">
            {i18n.t('login_screen_continue_title')}
          </Heading>
          <SignInButton />
        </Box>
      </VStack>
    </View>
  );
};

export {Login};
