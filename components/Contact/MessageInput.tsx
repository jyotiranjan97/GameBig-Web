import { useState, FormEvent } from 'react';
import { useAuth } from '../../context/authContext';
import firebase, { db } from '../../firebase/firebaseClient';
import { InputChat } from '../../utilities/contact/contact';

export default function MessageInput({
  receivingUser,
  messageRoomId,
}: {
  receivingUser: any;
  messageRoomId?: string;
}) {
  const [message, setMessage] = useState<string>('');
  const { userData } = useAuth();

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const chat: InputChat = {
  //     userName: userData.username,
  //     userId: userData.uid,
  //     msg: message,
  //     subHeader: '',
  //   };
  //   const chatId = await postMessage(chat);
  //   setMessage('');
  // };

  const createMessageRoom = async () => {
    let roomId = '';
    await db
      .collection('messageRooms')
      .add({
        usernames: [userData.username, receivingUser.username],
        userDetails: {
          [userData.username]: {
            uid: userData.uid,
            username: userData.username,
            photoURL: userData.photoURL,
            name: userData.name,
          },
          [receivingUser.username]: {
            uid: receivingUser.uid,
            username: receivingUser.username,
            photoURL: receivingUser.photoURL,
            name: receivingUser.name,
          },
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastMessage: '',
        noOfUnseenMessages: 0,
      })
      .then(function (docRef) {
        roomId = docRef.id;
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
    return roomId;
  };

  const updateMessageRoom = async ({
    roomId,
    message,
  }: {
    roomId: string;
    message: string;
  }) => {
    await db
      .collection('messageRooms')
      .doc(roomId)
      .set({
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastMessage: message,
        noOfUnseenMessages: 0, // increment
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  };

  const sendMessage = async () => {
    if (message === '') return;

    let roomId;
    if (!messageRoomId) {
      roomId = await createMessageRoom();
    } else {
      roomId = messageRoomId;
    }
    db.collection('messageRooms').doc(roomId).collection('messages').add({
      message: 'test',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    if (messageRoomId) {
      updateMessageRoom({ roomId, message });
    }
  };

  return (
    <form
      className="w-full pb-3 flex items-center justify-between pt-4"
      onSubmit={sendMessage}
    >
      <input
        aria-placeholder="Type Here"
        placeholder="Type Here..."
        className={
          'py-3 mx-3 pl-5 block w-full rounded-lg bg-gray-700 ' +
          'outline-none font-semibold font-sans focus:text-gray-200 tracking-wide'
        }
        type="text"
        name="message"
        required
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      <button
        onClick={sendMessage}
        className="outline-none focus:outline-none"
        type="submit"
      >
        <svg
          className="fill-current text-indigo-600 transform rotate-90"
          height={46}
          width={48}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 
            15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          />
        </svg>
      </button>
    </form>
  );
}