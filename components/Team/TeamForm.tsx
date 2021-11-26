import { useState, ChangeEvent } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import * as yup from 'yup';
import { db } from '../../firebase/firebaseClient';
import { BasicUserType, TeamType } from '../../utilities/types';
import FormInput from '../UI/Inputs/FormInput';
import FixedButton from '../UI/Buttons/FixedButton';
import SelectDropDown from '../UI/Select/SelectDropDown';
import LoadingLottie from '../UI/Loaders/Dots';
import { useUI } from '@/context/uiContext';
import { getUserByUsername } from '@/libs/user';
import { useAuth } from '@/context/authContext';
import HorizontalProfile from '../Profile/HorizontalProfile';

type PropsType = {
  teamData?: TeamType;
  teamSize?: number;
  onCancel: () => void;
  handleSubmit?: (teamData: TeamType) => void;
  setPart: (num: number) => void;
  setTeamId: (id: string) => void;
};

export default function CreateTeam({
  teamData,
  onCancel,
  handleSubmit,
  setPart,
  setTeamId,
}: PropsType) {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();
  const [teamName, setTeamname] = useState(teamData?.teamName || '');

  const save = async () => {
    const { name, photoURL, username, uid } = userData;
    const gamer = { name, photoURL, username, uid };
    if (teamData) {
      try {
        await db.collection('teams').doc(teamData.docId).update({
          teamName,
        });
        if (teamData.docId) setTeamId(teamData.docId);
        openSnackBar({
          label: 'Yay!',
          message: `${teamName} updated!`,
          type: 'success',
        });
        setPart(1);
      } catch (err) {
        console.log('err', err);
      }
    } else {
      try {
        await db
          .collection('teams')
          .add({
            teamName,
            gamers: [gamer],
            uids: [uid],
          })
          .then((docRef) => {
            setTeamId(docRef.id);
          });
        openSnackBar({
          label: 'Yay!',
          message: `${teamName} added!`,
          type: 'success',
        });
        setPart(1);
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 rounded-lg">
      <div className="text-gray-300 font-sans font-semibold flex flex-col w-full items-center">
        <span className="text-2xl my-4">Create Your Team</span>
        <div className="md:w-1/2 w-11/12">
          <FormInput
            labelName="Team Name"
            name="teamName"
            value={teamName}
            placeHolder="Awsome Team"
            onChangeHandler={(e: ChangeEvent) => {
              const target = e.target as HTMLInputElement;
              setTeamname(target.value);
            }}
          />
        </div>
        <div className="flex justify-end md:w-1/2 w-11/12">
          <FixedButton type="submit" name="Continue" onClick={save} />
        </div>
      </div>
    </div>
  );
}
