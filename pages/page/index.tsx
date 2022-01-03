import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { db } from 'firebase/firebaseClient';
import { useAuth } from '@/context/authContext';
import PageIntro from '../../components/Page/PageIntro/PageIntro';
import Aux from '../../hoc/Auxiliary/Auxiliary';

export default function Home() {
  const { userData } = useAuth();
  const router = useRouter();
  useEffect(() => {
    function goToMyPage() {
      db.collection('pages')
        .where('admins', 'array-contains', userData.uid)
        .get()
        .then((querySnapshot) => {
          const pageIds: string[] = [];
          querySnapshot.forEach((doc) => {
            if (doc.data()) {
              pageIds.push(doc.id);
            }
          });
          if (pageIds.length > 0) router.push(`/page/${pageIds[0]}/events`);
        });
    }
    goToMyPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.uid]);
  return (
    <Aux>
      <Head>
        <title>Page</title>
        <meta
          name="description"
          content="Create an Page and Start host custom room matches for BGMI, Call of Duty and Gerena Freefire"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <PageIntro />
    </Aux>
  );
}
