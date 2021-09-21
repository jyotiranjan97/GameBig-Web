import React, { useEffect, useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import firebase, { db } from '../firebase/firebaseClient';
import { User, UserData } from '../utilities/types';
import getUser from '../lib/getUser';

const authContext = createContext({
  user: { uid: '', username: '', photoURL: '' } as User,
  userData: {} as UserData,
  updateUser: (user: User) => {},
  updateOrgId: (id: string) => {},
  updateOrgName: (name: string) => {},
  authPageNumber: 1,
  updateDisplayName: (displayName: string): Promise<void> => {
    return Promise.resolve();
  },
  createUser: (userData: UserData): Promise<void> => {
    return Promise.resolve();
  },
  updateAuthPageNumber: (pageNumber: number) => {},
  isUsernameTaken: (username: string): Promise<boolean> => {
    return Promise.resolve(false);
  },
  signout: (): Promise<void> => {
    return Promise.resolve();
  },
  signInByFacebook: (): Promise<void> => {
    return Promise.resolve();
  },
  signInByGoogle: (): Promise<void> => {
    return Promise.resolve();
  },
});

function useProvideAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [authPageNumber, setAuthPageNumber] = useState<number>(1);

  const signout = async () => {
    await firebase.auth().signOut();
    router.push('/');
    setUser({} as User);
    setAuthPageNumber(1);
  };

  const signInWithProvider = async (provider: firebase.auth.AuthProvider) => {
    firebase.auth().useDeviceLanguage();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        if (user) handleSignIn(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
  };

  const signInByGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return signInWithProvider(provider);
  };

  const signInByFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return signInWithProvider(provider);
  };

  const isUsernameTaken = async (username: string) =>
    await db
      .collection('users')
      .where('username', '==', username)
      .where('username', '!=', user.username)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
        return false;
      });

  const updateDisplayName = async (displayName: string) => {
    const user = firebase.auth().currentUser;
    if (user)
      user
        .updateProfile({
          displayName,
        })
        .then(() => {
          console.log('User display name updated successfully');
        })
        .catch((error) => {
          console.log('User display name update failed');
        });
  };

  const createUser = async (userData: UserData | UserData) => {
    try {
      await db
        .collection('users')
        .add({ ...userData, uid: user.uid, photoURL: user.photoURL });
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleSignIn = async (user: firebase.User) => {
    const token = await user.getIdToken();
    nookies.set(undefined, 'token', token, { path: '/' });
    const { uid, displayName, photoURL } = user;
    if (uid && displayName && photoURL) {
      const userData = await getUser(displayName);
      if (userData) {
        router.push('/');
        setAuthPageNumber(1);
        setUser({ uid, username: displayName, photoURL });
        setUserData(userData);
      } else {
        setAuthPageNumber(2);
        setUser({ uid, username: displayName.split(' ')[0], photoURL });
      }
    }
  };

  useEffect(() => {
    const getAndSetUserData = async (currentUser: {
      uid: string;
      displayName: string;
      photoURL: string;
    }) => {
      const { uid, displayName, photoURL } = currentUser;
      const userData = await getUser(displayName);
      if (userData) {
        setUser({ uid, username: displayName, photoURL });
        setUserData(userData);
      } else {
        setUser({ uid, username: displayName.split(' ')[0], photoURL });
      }
    };

    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser({ uid: '', username: '', photoURL: '' });
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        const { uid, displayName, photoURL } = user;
        if (uid && displayName && photoURL) {
          getAndSetUserData({ uid, displayName, photoURL });
        }
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  const updateOrgId = (id: string) => {
    setUserData({ ...userData, linkedOrganizationId: id });
  };

  const updateOrgName = (name: string) => {
    setUserData({ ...userData, linkedOrganizationName: name });
  };

  const updateAuthPageNumber = (pageNo: number) => {
    setAuthPageNumber(pageNo);
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  return {
    user,
    userData,
    updateOrgId,
    updateUser,
    updateOrgName,
    authPageNumber,
    updateDisplayName,
    createUser,
    isUsernameTaken,
    updateAuthPageNumber,
    signout,
    signInByFacebook,
    signInByGoogle,
  };
}

type Props = {
  user?: User;
  isSignedIn?: boolean;
  userData?: UserData;
  updateOrgId?: () => void;
  updateUser?: (user: User) => void;
  updateOrgName?: (name: string) => void;
  children: React.ReactNode;
  authPageNumber?: number;
  updateDisplayName?: (displayName: string) => void;
  createUser?: (userData: UserData) => void;
  isUsernameTaken?: (username: string) => boolean;
  updateAuthPageNumber?: (param: number) => void;
  signout?: () => void;
  signInByFacebook?: () => void;
  signInByGoogle?: () => void;
};

export const AuthProvider = ({ children }: Props) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
