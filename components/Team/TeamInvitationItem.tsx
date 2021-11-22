import { useUI } from '@/context/uiContext';
import { db } from '../../firebase/firebaseClient';
import { TeamType } from '../../utilities/types';
import TextButton from '../UI/Buttons/TextButton';
import HorizontalProfile from '../Profile/HorizontalProfile';
import FixedButton from '../UI/Buttons/FixedButton';

type Props = {
  team: TeamType;
  removeTeam?: (id: string) => void;
  openModal?: (open: boolean) => void;
  setSelectedTeam?: (team: TeamType) => void;
};

export default function TeamItem({
  team,
  removeTeam,
  openModal,
  setSelectedTeam,
}: Props) {
  const { openSnackBar } = useUI();

  const deleteInvitation = async () => {
    try {
      await db.collection('teams').doc(team.docId).delete();
      openSnackBar({
        label: 'Deleted',
        message: `${team.teamName} deleted!`,
        type: 'success',
      });
      if (team.docId && removeTeam) removeTeam(team.docId);
    } catch (err) {
      console.log('err', err);
    }
  };

  const acceptInvitation = async () => {
    try {
      await db.collection('teams').doc(team.docId).delete();
      openSnackBar({
        label: 'Deleted',
        message: `${team.teamName} deleted!`,
        type: 'success',
      });
      if (team.docId && removeTeam) removeTeam(team.docId);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleEdit = () => {
    if (setSelectedTeam && openModal) {
      setSelectedTeam(team);
      openModal(true);
    }
  };

  if (!team.teamName && team.gamers.length === 1)
    return <HorizontalProfile user={team.gamers[0]} />;

  return (
    <div
      className={
        'flex flex-col my-1 px-2 py-6 justify-center text-lg ' +
        'text-gray-300 font-sans font-semibold rounded-lg bg-gray-900 '
      }
    >
      <h6 className="text-2xl text-indigo-600 mx-4 mb-2">{team.teamName}</h6>
      <h6 className="text-lg text-gray-300 mx-4 mb-2">Gamers</h6>
      <div>
        {team.gamers.map((gamer, index) => (
          <div key={index}>
            <HorizontalProfile user={gamer} />
          </div>
        ))}
      </div>
      <h6 className="text-lg text-gray-300 mx-4 mb-2">Invited Gamers</h6>
      <div>
        {team.invitedGamers &&
          team.invitedGamers.map((gamer, index) => (
            <div key={index}>
              <HorizontalProfile user={gamer} />
            </div>
          ))}
      </div>

      <div className="flex justify-end px-4 gap-4">
        <TextButton type="fail" name="Delete" onClick={deleteInvitation} />
        <FixedButton type="button" name="Accept" onClick={acceptInvitation} />
      </div>
    </div>
  );
}
