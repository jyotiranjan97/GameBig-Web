import { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../context/authContext';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import AuthComponent from '../../components/Auth/AuthComponent';
import AddGames from '../../components/Auth/AddGames';
import BasicForm from '../../components/Auth/BasicForm';
import { UserData } from '../../utilities/types';

const inititalValues: UserData = {
  uid: '',
  username: '',
  country: 'India',
};

export default function Home() {
  const { authPageNumber } = useAuth();
  const [userData, setUserData] = useState(inititalValues);
  return (
    <Aux>
      <Head>
        <title>Authentication</title>
        <meta
          name="description"
          content="Join GameBig today by signing up. Participate in exciting custom room matches and tournaments."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div
        className={
          'flex flex-col justify-end items-center sm:justify-center ' +
          'fixed w-screen h-screen inset-0 bg-black z-50'
        }
      >
        {
          {
            1: <AuthComponent />,
            2: <BasicForm userData={userData} setUserData={setUserData} />,
            3: <AddGames isUpdating={false} username={userData.username} />,
          }[authPageNumber]
        }
      </div>
    </Aux>
  );
}
