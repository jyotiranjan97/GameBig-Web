import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '@/context/authContext';
import { useNotication } from '@/context/notificationContext';
import Aux from '../../hoc/Auxiliary/Auxiliary';

export default function Home() {
  const { userData } = useAuth();
  const { notices } = useNotication();
  const router = useRouter();

  const handleClick = (type: string) => {
    switch (type) {
      case 'TEAM':
        router.push(`/profile/${userData.username}/teams`);
        break;
    }
  };

  return (
    <Aux>
      <Head>
        <title>Notification</title>
        <meta name="description" content="Notification About Upcoming events" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="flex flex-col mx-auto w-11/12 md:w-1/2">
        {notices.map(function (notice, index) {
          return (
            <div
              className="bg-gray-900 rounded-md py-2 px-4 my-0.5 "
              key={index}
              onClick={() => handleClick(notice.type)}
            >
              <span className="text-lg text-gray-300 font-sans">
                {notice.message}
              </span>
            </div>
          );
        })}
      </div>
    </Aux>
  );
}
