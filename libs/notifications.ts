import { db } from 'firebase/firebaseClient';

type Props = {
  data?: any;
  uid: string;
  message: string;
  type: string;
};
export const notifyUser = async ({ data, uid, message, type }: Props) => {
  await db.collection('users').doc(uid).collection('notifications').add({
    data,
    message,
    type,
  });
};
