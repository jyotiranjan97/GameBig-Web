import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import ProfileCard from '../../components/Profile/ProfileCard';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { UserData } from '../../utilities/types';
import { firebaseAdmin } from 'firebase/firebaseAdmin';
import useSWR from 'swr';
import axios from 'axios';
const { BASE_URL } = process.env;

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data.users;
};

const People = () => {
  const { data: users } = useSWR(`${BASE_URL}/api/people`, fetcher);

  if (!users) return null;

  return (
    <div>
      <Head>
        <title>People</title>
        <meta
          name="description"
          content="Find Gamers Like you, connect with them!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <div className="xl:w-1/2 lg:w-2/3 md:w-5/6 w-11/12 mx-auto mt-2">
          <span className="text-gray-400 font-medium text-lg tracking-wide">
            People you may know
          </span>
        </div>
        <div
          className={
            'xl:w-1/2 lg:w-2/3 md:w-5/6 w-11/12 grid grid-cols-2 sm:grid-cols-3 ' +
            'gap-3 sm:gap-5 mt-3 mx-auto'
          }
        >
          {users.map((user: UserData) => (
            <ProfileCard user={user} key={user.uid} />
          ))}
        </div>
      </Aux>
    </div>
  );
};

export default People;
