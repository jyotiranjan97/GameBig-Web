import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { useUI } from '@/context/uiContext';
import { games } from '../../utilities/GameList';
import { ProfileCardData } from '../../utilities/friends/friends';
import {
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
} from '../../libs/friendRequests';

const GameBadge = ({ gamecode, key }: { gamecode: string; key: number }) => {
  return (
    <div className="flex m-1 py-1 px-1.5 border-2 border-green-500 bg-gray-800 rounded-md gap-2">
      <div className="relative h-5 w-5 ">
        <Image
          src={games[gamecode].imageSource}
          alt="Picture of a friend"
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <span className="text-sm text-indigo-600">
        {games[gamecode].shortName}
      </span>
    </div>
  );
};

const Button = ({
  onClick,
  classname,
  text,
}: {
  onClick: () => void;
  classname: string;
  text: string;
}) => (
  <div
    onClick={onClick}
    className={
      'flex items-center w-full justify-center font-sans text-base md:text-xl py-1 px-4 rounded-md ' +
      classname
    }
  >
    <span>{text}</span>
  </div>
);

const ProfileCard = ({
  photoURL,
  username,
  games,
  uid,
  name,
  receiverUid,
  id,
}: ProfileCardData) => {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center font-sans font-semibold text-gray-300 h-auto w-min p-2 md:p-4
        gap-2 rounded-lg bg-gray-900 cursor-pointer"
    >
      <div
        onClick={() => {
          router.push(`/profile/${username}`);
        }}
        className="flex flex-col items-center"
      >
        {photoURL ? (
          <div className="h-32 w-32 md:h-52 md:w-52 relative">
            <Image
              src={photoURL}
              alt="Picture of a friend"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        ) : null}
        <span className="text-indigo-600 text-xl">{name}</span>
        <span className="text-gray-300 text-xl">{username}</span>
        <div className="flex flex-wrap justify-center">
          {games.map((game: string, index: number) => (
            <GameBadge key={index} gamecode={game} />
          ))}
        </div>
      </div>
      {receiverUid ? (
        <div className="flex flex-col w-full gap-2">
          <Button
            onClick={() => {
              acceptFriendRequest({
                acceptingUser: {
                  name: userData.name as string,
                  photoURL: userData.photoURL as string,
                  username: userData.username,
                  uid: userData.uid,
                },
                requestingUser: {
                  photoURL: photoURL as string,
                  username: username as string,
                  name: name as string,
                  uid: uid as string,
                },
                docId: id as string,
              });
              openSnackBar({
                message: `${username} and you are friends!`,
                type: 'success',
                label: 'Accepted!',
              });
            }}
            text="Accept"
            classname="bg-indigo-600"
          />
          <Button
            onClick={() => {
              deleteFriendRequest(id as string);
              openSnackBar({
                message: `Request is Ignored!`,
                type: 'success',
                label: 'Ignored!',
              });
            }}
            text="Ignore"
            classname="bg-gray-900 hover:bg-gray-800"
          />
        </div>
      ) : (
        <Button
          onClick={() => {
            sendFriendRequest({
              sendingUser: {
                name: userData.name as string,
                photoURL: userData.photoURL as string,
                username: userData.username,
                uid: userData.uid,
              },
              receivingUser: {
                photoURL: photoURL as string,
                username,
                name: name as string,
                uid: uid as string,
              },
            });
            openSnackBar({
              message: `Request sent to ${username}`,
              type: 'success',
              label: 'Sent!',
            });
          }}
          text="Add Friend"
          classname="bg-indigo-600"
        />
      )}
    </div>
  );
};

export default ProfileCard;
