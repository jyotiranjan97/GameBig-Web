import { FC } from 'react';
import Link from 'next/link';
import PeopleConnect from './PeopleConnect';
import Opening from './Opening';
import ParticipateEvent from './ParticipateEvent';

const FeaturesComponent: FC = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 relative z-10 py-10 xl:py-20">
      <PeopleConnect />
      <Opening />
      <ParticipateEvent />
      <div
        className={
          'w-full h-[80vh] bg-gray-900/50 rounded-xl mb-10 xl:mb-20 ' +
          'backdrop-blur-3xl shadow-xl shadow-gray-800/50'
        }
      ></div>
    </div>
  );
};

export default FeaturesComponent;
