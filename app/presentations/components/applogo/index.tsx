import React from 'react';
import {Image} from 'native-base';

interface IAppLogoProps {
  size?: '16' | '32' | '48' | 'xl' | '2xl';
}

const AppLogo = ({size}: IAppLogoProps) => {
  const appIconPath = '../../../../assets/images/icon.png';

  return (
    <Image
      alt="App Icon"
      alignItems={'center'}
      rounded={'full'}
      size={size}
      source={require(appIconPath)}
    />
  );
};

export {AppLogo};
