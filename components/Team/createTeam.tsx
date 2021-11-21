import { useState } from 'react';
import * as yup from 'yup';
import TeamForm from './TeamForm';
import GamerInvitation from './GamerInvitation';
import { BasicUserType, TeamType } from '../../utilities/types';
import FixedButton from '../UI/Buttons/FixedButton';
import { useUI } from '@/context/uiContext';
import { useAuth } from '@/context/authContext';

type PropsType = {
  teamData?: TeamType;
  teamSize?: number;
  onCancel: () => void;
  handleSubmit?: (teamData: TeamType) => void;
};

export default function CreateTeam({ teamData, onCancel }: PropsType) {
  const [part, setPart] = useState<number>(1);
  return (
    <div className="bg-gray-900 rounded-lg w-full">
      {
        {
          0: (
            <TeamForm
              teamData={teamData}
              onCancel={onCancel}
              setPart={setPart}
            />
          ),
          1: <GamerInvitation onCancel={onCancel} setPart={setPart} />,
        }[part]
      }
    </div>
  );
}
