import { TeamUpSchemaType } from '@/utilities/join/teamUpTypes';
import { db } from 'firebase/firebaseClient';

export async function createNewPost(post: TeamUpSchemaType) {
  const joinCollectionRef = db.collection('join');
  try {
    await joinCollectionRef.add(post);
    return true;
  } catch {
    return false;
  }
}
