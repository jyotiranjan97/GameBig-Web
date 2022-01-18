import { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { BasicUserType } from '../../../utilities/types';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import { db } from 'firebase/firebaseClient';
import ProfileCard from '@/components/Profile/ProfileCard';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const { BASE_URL } = process.env;

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data.data;
};

const Following: NextPage = () => {
  const router = useRouter();
  const { data: userData } = useSWR(
    `${BASE_URL}/api/user/?username=${router.query.username}`,
    fetcher
  );
  const [followees, setFollowees] = useState<BasicUserType[]>([]);
  useEffect(() => {
    function getFollowees() {
      let users: BasicUserType[] = [];
      db.collection('users')
        .doc(userData.uid)
        .collection('followees')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data() as BasicUserType;
            if (data) {
              users.push({
                ...data,
                docId: doc.id,
              });
            }
          });
          setFollowees(users);
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
    }
    if (userData) getFollowees();
  }, [userData]);

  if (!userData) return null;

  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta
          name="description"
          content={`${userData.name}'s Profile`}
          key="desc"
        />

        {/* OG meta */}
        <meta property="og:title" content="Profile" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Check out my profile at GameBig"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <ProfileHeader userData={userData} />
        {followees.length > 0 ? (
          <div
            className={
              'xl:w-1/2 lg:w-2/3 md:w-5/6 w-11/12 grid grid-cols-2 sm:grid-cols-3 ' +
              'gap-3 sm:gap-5 mt-3 mx-auto'
            }
          >
            {followees.map((user) => (
              <ProfileCard user={user} key={user.uid} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <span className="text-lg text-gray-500 font-medium text-center">
              You are not following anyone!
            </span>
          </div>
        )}
      </Aux>
    </div>
  );
};

export default Following;
