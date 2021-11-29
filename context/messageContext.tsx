import React, { useEffect, useState, createContext, useContext } from 'react';
import { db } from '../firebase/firebaseClient';
import { useAuth } from './authContext';
import { MessageRoomType } from '@/utilities/messages/MessagesTypes';

const messageContext = createContext({
  messageRooms: [] as MessageRoomType[],
  unread: 0,
});

function useProviderMessages() {
  const { userData } = useAuth();
  const [messageRooms, setMessageRooms] = useState<MessageRoomType[]>([]);
  const [unread, setUnread] = useState<number>(0);

  useEffect(() => {
    if (userData.uid) {
      db.collection('messageRooms')
        .where('uids', 'array-contains', userData.uid)
        .onSnapshot((snapshot) => {
          const rooms = snapshot.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
          }));
          setMessageRooms(rooms as any);
        });
    }
  }, [userData.uid]);
  return { messageRooms, unread };
}

type Props = {
  children: React.ReactNode;
};

export const MessagesProvider = ({ children }: Props) => {
  const provider = useProviderMessages();
  return (
    <messageContext.Provider value={provider}>
      {children}
    </messageContext.Provider>
  );
};

export const useMessages = () => {
  return useContext(messageContext);
};
