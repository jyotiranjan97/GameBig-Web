import { useAuth } from '@/context/authContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FixedButton from '../UI/Buttons/FixedButton';

export default function TeamUpItem() {
  const {
    userData: { username, name, photoURL },
  } = useAuth(); //TODO: remove this
  const router = useRouter();
  const openProfile = () => {
    router.push(`/profile/${username}`);
  };

  return (
    <div
      className={
        'xl:w-1/2 md:w-5/6 mx-auto font-sans px-3 md:px-12 pb-8 pt-4 ' +
        'bg-gray-900 rounded-lg my-2 '
      }
    >
      <div className="flex items-center justify-between px-3 mb-8 rounded-lg border-2 border-gray-800 ">
        <section
          className="flex gap-3 items-center justify-start "
          onClick={openProfile}
        >
          {photoURL ? (
            <div className="relative h-10 w-10 md:h-14 md:w-14 cursor-pointer">
              <Image
                src={photoURL}
                alt="Picture of a friend"
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
            </div>
          ) : null}
          <section className="flex flex-col cursor-pointer">
            <span className="font-semibold text-sm  md:text-lg text-gray-300 hover:text-indigo-600">
              {name}
            </span>
            <span className="font-semibold text-gray-500 text-xs md:text-base">
              @{username}
            </span>
          </section>
        </section>
        <FixedButton
          name={`Join ${username}`}
          onClick={() => {
            console.log('join');
          }}
        />
      </div>
      <span className="text-gray-100 tracking-wide pt-1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur optio
        incidunt et ducimus sequi explicabo ipsam enim quasi expedita eligendi
        non numquam dolor labore, harum libero? Nesciunt dolorum reprehenderit
        eius.
      </span>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 mt-8 space-5 gap-6">
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Game</span>
          <span className="text-gray-100 tracking-wide pt-1">BGMI</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Mode</span>
          <span className="text-gray-100 tracking-wide pt-1">TPP</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">K/D</span>
          <span className="text-gray-100 tracking-wide pt-1">6</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">
            Average Damage
          </span>
          <span className="text-gray-100 tracking-wide pt-1">2kg</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Age</span>
          <span className="text-gray-100 tracking-wide pt-1">24</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">
            Experience
          </span>
          <span className="text-gray-100 tracking-wide pt-1">1 year</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Role</span>
          <span className="text-gray-100 tracking-wide pt-1">Sniper</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Purpose</span>
          <span className="text-gray-100 tracking-wide pt-1">Rank up</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Language</span>
          <span className="text-gray-100 tracking-wide pt-1">Hindi</span>
        </section>
      </div>
    </div>
  );
}
