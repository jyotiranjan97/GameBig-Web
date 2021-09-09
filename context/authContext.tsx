import React, { useEffect, useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import firebase, { db } from '../firebase/config';
import { User, UserData } from '../utilities/types';
import getUser from '../lib/getUser';

const authContext = createContext({
  user: { uid: '', username: '', photoURL: '', linkedOrgId: null } as User,
  userData: {} as UserData,
  linkedOrgId: null as string | null,
  updateOrgId: (id: string) => {},
  updateUser: (user: User) => {},
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
  const [linkedOrgId, setLinkedOrgId] = useState<string | null>(null);
  const [authPageNumber, setAuthPageNumber] = useState<number>(1);

  const signout = async () => {
    await firebase.auth().signOut();
    router.push('/');
    setUser({} as User);
    setLinkedOrgId(null);
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
    const { uid, displayName, photoURL } = user;
    if (uid && displayName && photoURL) {
      const userData = await getUser(displayName);
      if (userData) {
        router.push('/');
        setAuthPageNumber(1);
        setUser({ uid, username: displayName, photoURL });
        const { linkedOrganizationId } = userData;
        setUserData(userData);
        if (linkedOrganizationId) setLinkedOrgId(linkedOrganizationId);
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
        const { linkedOrganizationId } = userData;
        setUserData(userData);
        if (linkedOrganizationId) setLinkedOrgId(linkedOrganizationId);
      } else {
        setUser({ uid, username: displayName.split(' ')[0], photoURL });
      }
    };

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;
        if (uid && displayName && photoURL) {
          getAndSetUserData({ uid, displayName, photoURL });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const updateOrgId = (id: string) => {
    setLinkedOrgId(id);
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
    linkedOrgId,
    updateOrgId,
    updateUser,
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
  linkedOrgId?: null | string;
  updateOrgId?: () => void;
  updateUser?: (user: User) => void;
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
