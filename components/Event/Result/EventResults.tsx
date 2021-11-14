import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormInput from '@/components/UI/Inputs/FormInput';
import SelectDropDown from '@/components/UI/Select/SelectDropDown';
import { TeamType } from '@/utilities/types';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import { db } from 'firebase/firebaseClient';
import TeamItem from '@/components/Profile/TeamItem';

interface Props {
  eventId: string;
}

const EventResultForm = ({ eventId }: Props) => {
  const [winners, setWinners] = useState<any>();
  const getResults = async (val: any) => {
    await db
      .collection('events')
      .doc(eventId)
      .collection('results')
      .doc('results')
      .set(val);
  };
  useEffect(() => {
    const getResults = async () => {
      await db
        .collection('events')
        .doc(eventId)
        .collection('results')
        .doc('results')
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            setWinners(doc.data());
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    };
    getResults();
  }, [eventId]);
  if (!winners) return null;
  return (
    <div className="w-1/2">
      <div className="flex flex-cols gap-4">
        <span className="text-gray-300 text-lg">First</span>
        {winners.firstPrize && (
          <span className="text-gray-300 text-lg">
            Prize: {winners.firstPrize}
          </span>
        )}
        {winners.firstWinner && <TeamItem team={winners.firstWinner} />}
      </div>
      <div className="flex flex-cols gap-4">
        <span className="text-gray-300 text-lg">Second</span>
        {winners.secondPrize && (
          <span className="text-gray-300 text-lg">
            Prize: {winners.secondPrize}
          </span>
        )}
        {winners.secondWinner && <TeamItem team={winners.secondWinner} />}
      </div>
      <div className="flex flex-cols gap-4">
        <span className="text-gray-300 text-lg">Third</span>
        {winners.thirdPrize && (
          <span className="text-gray-300 text-lg">
            Prize: {winners.thirdPrize}
          </span>
        )}
        {winners.thirdWinner && <TeamItem team={winners.thirdWinner} />}
      </div>
    </div>
  );
};

export default EventResultForm;
