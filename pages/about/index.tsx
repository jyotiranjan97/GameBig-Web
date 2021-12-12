import { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';

import HeaderLogo from '@/components/UI/Logo/HeaderLogo';
import LandingComponent from '@/components/about/LandingComponent';
import FeaturesComponent from '@/components/about/FeaturesComponent';

const AboutPage: NextPage = () => {
  function handleAuthClick() {
    router.push('/auth');
  }

  return (
    <div className="flex flex-col bg-black fixed w-screen inset-0 z-50 overflow-auto">
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content={
            'Upcoming Esports Events in COD, BGMI and FreeFire. ' +
            'Interested players can register instantly for custom rooms and events.'
          }
          key="desc"
        />

        {/* OG meta */}
        <meta property="og:title" content="Welcome to GameBig" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Join GameBig to connect and play with awsome gamers, just like you!"
        />
        <meta property="og-url" content="https://www.gamebig.in" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div
        className={
          'h-auto bg-gradient-to-b from-black via-black to-gray-900 ' +
          'shadow-md shadow-gray-900 flex flex-row justify-between px-4 py-1 z-[1005]'
        }
      >
        <HeaderLogo />
        <button
          className={
            'bg-indigo-600 hover:bg-indigo-800 font-semibold ' +
            'text-md my-1.5 md:my-2 py-2 px-2 text-gray-300 rounded-md ' +
            'cursor-pointer shadow-md shadow-indigo-600/50'
          }
          onClick={handleAuthClick}
        >
          Sign&nbsp;In/ Sign&nbsp;Up
        </button>
      </div>
      <LandingComponent />
      <FeaturesComponent />
    </div>
  );
};

export default AboutPage;
