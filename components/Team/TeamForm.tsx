import { useState } from 'react';
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

const validationSchema = yup.object({
  teamName: yup.string().required('Team name is required'),
  username: yup.string(),
  inGameLead: yup.string().required('In Game Lead is required'),
});

type PropsType = {
  teamData?: TeamType;
  teamSize?: number;
  onCancel: () => void;
  handleSubmit?: (teamData: TeamType) => void;
  setPart: (num: number) => void;
};

const emptyValues = {
  username: '',
  teamName: '',
  inGameLead: '',
};

export default function CreateTeam({
  teamData,
  onCancel,
  handleSubmit,
}: PropsType) {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();
  const [gamers, setgamers] = useState<BasicUserType[]>(
    teamData?.gamers || [
      {
        uid: userData.uid,
        username: userData.username,
        name: userData.name,
        photoURL: userData.photoURL,
      },
    ]
  );
  const [invitedGamers, setInvitedGamers] = useState<BasicUserType[]>(
    teamData?.invitedGamers || []
  );

  const formik = useFormik({
    initialValues: {
      ...emptyValues,
      teamName: teamData?.teamName,
      inGameLead: teamData?.teamName,
    },
    validationSchema: validationSchema,
    onSubmit: ({ teamName, inGameLead }, { setSubmitting }) => {
      setSubmitting(true);
      if (teamName && inGameLead) {
        const uids = gamers.map((gamer) => gamer.uid);
        const invitedUids = invitedGamers.map((gamer) => gamer.uid);
        const team: TeamType = {
          teamName,
          uids,
          gamers,
          invitedGamers,
          invitedUids,
          inGameLead,
        };
        saveTeam(team);
        if (handleSubmit) handleSubmit(team);
      }
      formik.resetForm();
      setSubmitting(false);
    },
  });

  const saveTeam = async (team: TeamType) => {
    try {
      await db.collection('teams').add(team);
      openSnackBar({
        label: 'Yay!',
        message: `${team.teamName} added!`,
        type: 'success',
      });
      onCancel();
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 rounded-lg w-11/12 md:w-1/2">
      <div className="text-gray-300 font-sans font-semibold w-full">
        <span className="text-2xl my-4">Create Your Team</span>
        <form className="flex flex-col mt-8" onSubmit={formik.handleSubmit}>
          <FormInput
            labelName="Team Name"
            name="teamName"
            value={formik.values.teamName}
            placeHolder="Awsome Team"
            onChangeHandler={formik.handleChange}
            error={Boolean(formik.errors.teamName)}
            errorMessage={formik.errors.teamName}
          />
          <div className="flex justify-end w-full">
            <FixedButton
              type="submit"
              name="Continue"
              isDisabled={formik.isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
