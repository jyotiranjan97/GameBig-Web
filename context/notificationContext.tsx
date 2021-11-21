import React, { useEffect, useState, createContext } from 'react';
import localforage from 'localforage';
import firebase from '../firebase/firebaseClient';
import { updateFcmToken } from '@/libs/user';
import { useAuth } from './authContext';

const notificationContext = createContext({ notices: [] });

function useProviderNotification() {
  const { userData } = useAuth();
  const [notices, setNotices] = useState<any>([]);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./firebase-messaging-sw.js')
        .then(function (registration) {
          console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function (err) {
          console.log('Service worker registration failed, error:', err);
        });
    }
  }, []);

  useEffect(() => {
    try {
      const messaging = firebase.messaging();
      const getToken = async () =>
        await messaging
          .getToken({
            vapidKey: process.env.FIREBASE_MESSAGING_VAPID_KEY,
          })
          .then(async (token) => {
            const oldToken = await localforage.getItem('fcmToken');
            if (token !== oldToken) {
              localforage.setItem('fcmToken', token);
            }
            if (userData.fcmToken !== token) {
              updateFcmToken(userData.uid, token);
            }
          })
          .catch((err) => {
            console.log('error getting fcm token', err);
          });
      getToken();
      navigator.serviceWorker.addEventListener('message', async (message) => {
        const data = message.data['firebase-messaging-msg-data'];
        console.log({ data });

        if (data) {
          const oldNotices: any = await localforage.getItem('notices');
          const notices = oldNotices ? [data, ...oldNotices] : [data];
          localforage.setItem('notices', notices);
        }
      });
    } catch (err) {
      console.log('error in fcm setup', err);
    }
  }, [userData.fcmToken, userData.uid]);
  return { notices };
}

type Props = {
  children: React.ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
  const provider = useProviderNotification();
  return (
    <notificationContext.Provider value={provider}>
      {children}
    </notificationContext.Provider>
  );
};
