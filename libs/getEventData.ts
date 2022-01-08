import { TeamType } from '@/utilities/types';
import { db } from '../firebase/firebaseClient';

export const fetchParticipatedTeams = async (eventId: string) => {
  let participants: TeamType[] = [];
  const participatedTeamsRef = db
    .collection('events')
    .doc(eventId)
    .collection('participants');
  try {
    const docSnapshots = await participatedTeamsRef.get();
    docSnapshots.forEach((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data)
          participants.push({
            gamers: data.gamers,
            uids: data.uids,
            inGameLead: data.inGameLead,
            teamName: data.teamName,
            phoneNumber: data.phoneNumber,
            docId: doc.id,
          });
      }
    });
  } catch (error) {
    console.log('Error fetching participated Teams', error);
  }

  return participants;
};
