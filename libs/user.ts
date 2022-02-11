import { UserData } from '@/utilities/types';
import { db } from 'firebase/firebaseClient';

export const updateUser = async (userData: UserData) => {
  try {
    await db.collection('users').doc(userData.uid).update(userData);
  } catch (err) {
    console.log('err', err);
  }
};

export const createUser = async (userData: UserData) => {
  try {
    await db.collection('users').doc(userData.uid).set(userData);
  } catch (err) {
    console.log('err', err);
  }
};

export const getUserByUsername = async (username: string) => {
  const user: UserData[] = [];
  await db
    .collection('users')
    .where('username', '==', username)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as UserData;
        user.push({ ...data, docId: doc.id });
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return user[0];
};

export const getUserData = async (uid: string) => {
  let user: UserData = {} as UserData;
  await db
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        user = doc.data() as UserData;
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  return user;
};

export const isUsernameTaken = async (username: string, uid: string) =>
  await db
    .collection('users')
    .where('username', '==', username)
    .where('uid', '!=', uid)
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
