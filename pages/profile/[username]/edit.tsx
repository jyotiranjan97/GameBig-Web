import Head from 'next/head';
import { useRouter } from 'next/router';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ProfileForm from '../../../components/Profile/ProfileForm';
import { UserData } from '../../../utilities/types';

const emptyInitialValues = {
  username: '',
  uid: '',
  name: '',
  dob: new Date('2014-08-18T21:11:54'),
  country: '',
  phoneNumber: '',
  email: '',
  youtubeLink: '',
  twitchLink: '',
  facebookLink: '',
  instagramLink: '',
  twitterLink: '',
  redditLink: '',
} as UserData;

export default function Home() {
  const router = useRouter();
  const { data } = router.query;
  let userData;
  if (typeof data === 'string') {
    userData = JSON.parse(data);
  }
  const oldValues = { ...emptyInitialValues, ...userData };
  return (
    <Aux>
      <Head>
        <title>Edit Profile</title>
        <meta name="description" content="Edit Profile Info" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ProfileForm oldValues={oldValues} push={router.push} />
    </Aux>
  );
}
