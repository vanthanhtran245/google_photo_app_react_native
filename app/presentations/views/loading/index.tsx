import React from 'react';
import {Center} from 'native-base';
import {CircularLoader} from '../../components/loading';

export const LoadingScreen = () => {
  return (
    <Center flex={1}>
      <CircularLoader />
    </Center>
  );
};
