import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../../../hooks/useAuth';
import {useServices} from '../../../hooks/useServices';
import {Splash} from '../splash';
import {LoadingScreen} from '../loading';
import {HomeTabComponent, LoginStackComponent} from './components/bottomTabs';

const AppNav = () => {
  const {isSignedIn, initializing} = useAuth();
  const {loading} = useServices();

  if (loading) {
    return <Splash />;
  }

  if (initializing) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {!isSignedIn ? <LoginStackComponent /> : <HomeTabComponent />}
    </NavigationContainer>
  );
};

export default AppNav;
