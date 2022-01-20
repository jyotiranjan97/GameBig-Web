import firebase, { db } from 'firebase/firebaseClient';

export async function submitFeedback(data: {
  email: string;
  description: string;
}) {
  try {
    const id = await db
      .collection('feedback')
      .add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    if (id) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Error Saving in Feedback', err);
    return false;
  }
}
