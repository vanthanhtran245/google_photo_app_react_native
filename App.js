import React from 'react';
import {Provider} from 'react-redux';
import {AuthProvider} from './app/hooks/useAuth';
import {AppServicesProvider} from './app/hooks/useServices';
import AppNav from './app/presentations/views/appNav';
import {NativeBaseProvider} from 'native-base';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {store} from './app/store/store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppServicesProvider>
          <NativeBaseProvider>
            <BottomSheetModalProvider>
              <AppNav />
            </BottomSheetModalProvider>
          </NativeBaseProvider>
        </AppServicesProvider>
      </AuthProvider>
      <Toast />
    </Provider>
  );
};

export default App;
