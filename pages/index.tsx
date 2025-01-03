import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../context/authContext';
import Aux from '../hoc/Auxiliary/Auxiliary';
import AuthComponent from '../components/Auth/AuthComponent';
import AddGames from '../components/Auth/AddGames';
import BasicForm from '../components/Auth/BasicForm';
import { UserData } from '../utilities/types';

const inititalValues: UserData = {
  uid: '',
  username: '',
  location: 'India',
};

export default function Home() {
  const {
    authPageNumber,
    userData: { username },
  } = useAuth();
  const [data, setData] = useState(inititalValues);
  const router = useRouter();
  useEffect(() => {
    if (username) router.push('/events');
  });
  return (
    <Aux>
      <Head>
        <title>GAMEBIG</title>
        <meta
          name="description"
          content="Join GameBig today by signing up. Participate in exciting gaming events."
          key="desc"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <script
          src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"
          async
        ></script>
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
            2: <BasicForm setData={setData} />,
            3: <AddGames uid={data.uid} />,
          }[authPageNumber]
        }
      </div>
    </Aux>
  );
}
