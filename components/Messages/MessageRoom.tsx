import { getDecoratedTime } from '@/utilities/functions/dateConvert';
import Image from 'next/image';

type Props = {
  receiverPhotoURL: string;
  receiverName: string;
  receiverUsername: string;
  receiverUid: string;
  lastMessage?: string;
  updatedAt: any;
  onClick: (user: any) => void;
};

const MessageRoom = ({
  receiverPhotoURL,
  receiverName,
  receiverUsername,
  receiverUid,
  lastMessage,
  updatedAt,
  onClick,
}: Props) => {
  const name =
    receiverName && receiverName.length > 18
      ? `${receiverName.slice(0, 18)}...`
      : receiverName;
  const time = getDecoratedTime(updatedAt.toDate().toISOString());

  return (
    <div
      onClick={() =>
        onClick({
          receiverUsername,
          receiverName,
          receiverPhotoURL,
          receiverUid,
        })
      }
      className={
        'flex items-center text-gray-300 font-sans cursor-pointer ' +
        'bg-gray-900 hover:bg-gray-900/70 w-full gap-3 px-3 py-3.5 m-1 rounded-md'
      }
    >
      <div className="relative h-12 w-14 ">
        <Image
          src={receiverPhotoURL}
          alt="Picture of a friend"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col w-full pr-2">
        <div className="flex justify-between items-center">
          <span className="text-lg  font-semibold">{name}</span>
          <span className="text-sm text-gray-400 text-right">{time}</span>
        </div>
        {lastMessage && (
          <h1 className="text-base font-medium text-gray-500">{lastMessage}</h1>
        )}
      </div>
    </div>
  );
};

export default MessageRoom;
