import React, { useEffect, useState, createContext, useContext } from 'react';
import { db } from '../firebase/firebaseClient';
import { useAuth } from './authContext';
import { MessageRoomType } from '@/utilities/messages/MessagesTypes';

const messageContext = createContext({
  messageRooms: [] as MessageRoomType[],
  unread: 0,
  currentMessageRoom: {} as MessageRoomType,
  updateCurrentMessageRoom: (mr: MessageRoomType) => {},
});

function useProviderMessages() {
  const { userData } = useAuth();
  const [messageRooms, setMessageRooms] = useState<MessageRoomType[]>([]);
  const [unread, setUnread] = useState<number>(0);
  const [currentMessageRoom, setCurrentMessageRoom] = useState<MessageRoomType>(
    {} as MessageRoomType
  );

  useEffect(() => {
    if (userData.uid) {
      db.collection('messageRooms')
        .where('uids', 'array-contains', userData.uid)
        .onSnapshot((snapshot) => {
          let tempUnread = 0;
          const tempMessageRooms: MessageRoomType[] = [];
          snapshot.docs.map((doc) => {
            const messageRoom = doc.data() as MessageRoomType;
            const { unread } = messageRoom;
            let currentRoomUnread = 0;
            if (unread && unread[userData.uid]) {
              currentRoomUnread = unread[userData.uid];
              tempUnread += currentRoomUnread;
            }
            tempMessageRooms.push({
              ...messageRoom,
              docId: doc.id,
              unread,
              noOfUnread: currentRoomUnread,
            });
          });
          setMessageRooms(tempMessageRooms);
          setUnread(tempUnread);
        });
    }
  }, [userData.uid]);
  const updateCurrentMessageRoom = (mr: MessageRoomType) => {
    setCurrentMessageRoom(mr);
  };
  return { messageRooms, unread, currentMessageRoom, updateCurrentMessageRoom };
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
