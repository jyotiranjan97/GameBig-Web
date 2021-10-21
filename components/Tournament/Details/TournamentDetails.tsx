import { useEffect, useState } from 'react';
import router from 'next/router';
import { useAuth } from '../../../context/authContext';
import SnackbarAlert from '../../UI/Snackbar/SnackBar';
import { TournamentData } from '../../../utilities/tournament/types';
import {
  getDecoratedDate,
  getDecoratedTime,
} from '../../../utilities/functions/dateConvert';
import { games } from '../../../utilities/GameList';
import { db } from '../../../firebase/firebaseClient';
import TextButton from '../../UI/Buttons/TextButton';
import TournamentCardAvatar from '../../UI/Avatar/TournamentCardAvatar';

interface Props {
  data: TournamentData;
  isOrganizer: boolean;
}

export default function DetailsAsParticipant({ data, isOrganizer }: Props) {
  const { user } = useAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (data.id && user.username) {
      db.collection('tournaments')
        .doc(data.id)
        .collection('teams')
        .where('usernames', 'array-contains', user.username)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data()) {
              setIsRegistered(true);
            }
          });
        });
    }
  }, [data.id, user.username]);

  const handleClose = () => {
    setShowInfo(false);
  };

  return (
    <div className="font-sans">
      {/**Back Button */}
      <div className="flex justify-start">
        <TextButton
          name="Go Back"
          type="fail"
          onClickHandler={() => router.back()}
        />
      </div>

      <div className="flex flex-row space-x-5 mx-3">
        <TournamentCardAvatar content={data?.linkedOrgName[0]} />
        <h1 className="text-indigo-600 text-xl font-semibold flex my-auto">
          {data?.linkedOrgName}
        </h1>
      </div>

      <div className="grid grid-cols-2 mx-5 mt-8 gap-3">
        {/** Game Name */}
        <section>
          <h2 className="font-semibold text-gray-500">Game</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {games[data.gameCode].shortName}
          </span>
        </section>
        {/** Game Mode */}
        <section>
          <h2 className="font-semibold text-gray-500">Mode</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {data.mode}
          </span>
        </section>

        {/** Tier / Scream */}
        <section>
          <h2 className="font-semibold text-gray-500">Tier</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {data.tier}
          </span>
        </section>
        {/** Prize Money */}
        <section>
          <h2 className="font-semibold text-gray-500">Prize</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {data.prize ? data.prize + ' ₹' : 'No Prize'}
          </span>
        </section>
        {/** Match Start Time */}
        <section>
          <h2 className="font-semibold text-gray-500">Match date &#38; time</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {getDecoratedTime(data.startTime)} {' - '}
            {getDecoratedTime(data.startTime, 30)}
          </span>
        </section>
        {/** Registration Open Till */}
        <section>
          <h2 className="font-semibold text-gray-500">
            Registration open till
          </h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {getDecoratedDate(data.startTime)}{' '}
            {getDecoratedTime(data.startTime)}
          </span>
        </section>
        <section>
          <h2 className="font-semibold text-gray-500">Max Slots Available</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {data.noOfSlots}
          </span>
        </section>
        <section className="col-span-2">
          <h2 className="font-semibold text-gray-500">Details/ Rules</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {data.description}
          </span>
        </section>
      </div>

      {isOrganizer || isRegistered ? (
        <div>
          {data.roomId && (
            <div>
              <span>
                Room Id :
                <span
                  onClick={() => {
                    if (data.roomId) {
                      navigator.clipboard.writeText(data.roomId);
                      setMessage('Room Id Copied !');
                      setShowInfo(true);
                    }
                  }}
                >
                  {data.roomId}
                </span>
              </span>
            </div>
          )}
          {data.password && (
            <div>
              <span>
                Password :
                <span
                  onClick={() => {
                    if (data.password) {
                      navigator.clipboard.writeText(data.password);
                      setMessage('Password Copied !');
                      setShowInfo(true);
                    }
                  }}
                >
                  {data.password}
                </span>
              </span>
            </div>
          )}
        </div>
      ) : null}
      <SnackbarAlert
        vertical="bottom"
        horizontal="center"
        open={showInfo}
        onClose={handleClose}
        autoHideDuration={3000}
        message={message}
        severity="info"
      />
    </div>
  );
}
