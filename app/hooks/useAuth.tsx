import React, {createContext, useContext, useEffect, useState} from 'react';
import {User as GoogleUser} from '@react-native-google-signin/google-signin';
import {authentication} from '../services/auth';
import {checkSignIn} from '../services/auth/authMethod';

export type TAuthContextType = {
  user: GoogleUser | null;
  initializing: boolean;
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};

export const useAuth = () => {
  return useContext(authContext);
};

export function AuthProvider({children}: {children: JSX.Element}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

const authContext = createContext<TAuthContextType>({
  user: null,
  isSignedIn: false,
  initializing: true,
  signIn: () => {
    throw new Error('context is missing');
  },
  signOut: () => {
    throw new Error('context is missing');
  },
});

interface TUseProvideAuthStates {
  user: GoogleUser | null;
  initializing: boolean;
}

const useProvideAuth = (): TAuthContextType => {
  const [authState, setAuthState] = useState<TUseProvideAuthStates>({
    initializing: false,
    user: null,
  });

  useEffect(() => {
    checkInitialUser();
  }, []);

  const checkInitialUser = async () => {
    setAuthState({
      initializing: true,
      user: null,
    });
    const user = await checkSignIn();
    if (user) {
      setAuthState({
        initializing: false,
        user: user,
      });
    } else {
      setAuthState({
        initializing: false,
        user: null,
      });
    }
  };

  const signIn = async () => {
    const user = await authentication.signIn();
    if (typeof user !== 'string') {
      setAuthState({
        initializing: false,
        user: user,
      });
    }
  };

  const signOut = async () => {
    await authentication.signOut();
    setAuthState({
      initializing: false,
      user: null,
    });
  };

  return {
    user: authState.user,
    initializing: authState.initializing,
    isSignedIn: authState.user !== null,
    signIn,
    signOut,
  };
};
