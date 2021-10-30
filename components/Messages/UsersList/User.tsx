import Image from 'next/image';

type Props = {
  image: string;
  username: string;
  name: string;
  lastMessage?: string;
};

const User = ({ image, name, username, lastMessage }: Props) => {
  return (
    <div
      className="flex items-center justify-items-stretch text-gray-300 font-sans font-semibold 
    bg-gray-900 w-full gap-3 px-3 py-3.5  m-1 rounded-md"
    >
      <div className="relative h-12 w-12 ">
        <Image
          src={image}
          alt="Picture of a friend"
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col w-full pr-2">
        <div className="flex justify-between">
          <span className="text-lg">{name}</span>
          <span className="text-xm">{username}</span>
        </div>
        {lastMessage && (
          <h1 className="text-base text-gray-500">{lastMessage}</h1>
        )}
      </div>
    </div>
  );
};

export default User;

//todo: show time of last message and name of the username
