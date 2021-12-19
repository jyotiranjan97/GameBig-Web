import { FC } from 'react';
import Lottie from 'react-lottie';
import Link from 'next/link';
import animationData from '@public/find_people_lottie.json';

const Opening: FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div
      className={
        'w-full h-[75vh] bg-gray-900/50 rounded-xl mb-10 xl:mb-20 ' +
        'backdrop-blur-3xl shadow-xl shadow-gray-800/50 ' +
        'flex sm:flex-row flex-col'
      }
    >
      <div className="sm:w-[50%] flex justify-center items-center">
        <Lottie options={defaultOptions} height={'80%'} width={'80%'} />
      </div>
      <div className="sm:w-[50%] my-auto">
        <div
          className={
            'text-indigo-600 sm:text-4xl text-2xl font-sans font-semibold ' +
            'text-center px-5'
          }
        >
          Find your perfect teammate and lineups with desired skills.
        </div>
        <Link href="/openings">
          <a
            className={
              'block bg-cyan-600 hover:bg-cyan-500 py-4 px-4 rounded-md ' +
              'text-lg font-medium text-white uppercase mt-10 tracking-wide ' +
              'shadow-md shadow-cyan-500/50 w-52 flex items-center justify-center ' +
              'mx-auto'
            }
          >
            Create Opening
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Opening;
