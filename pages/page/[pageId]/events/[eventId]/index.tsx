import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import EventDetails from '../../../../../components/Event/Details/EventDetails';
import ParticipantList from '../../../../../components/Event/ParticipantList/ParticipantList';
import RegisterEventForm from '../../../../../components/Event/Register/RegisterEventForm';
import SendNotification from '../../../../../components/Event/Notification/SendNotification';
import { useAuth } from '../../../../../context/authContext';
import Aux from '../../../../../hoc/Auxiliary/Auxiliary';
import { fetchEventDataById } from '../../../../../libs/getEventData';
import { EventData } from '../../../../../utilities/eventItem/types';
import SoloRegistrationForm from '../../../../../components/Event/Register/SoloRegistrationForm';
import { db } from '../../../../../firebase/firebaseClient';
import router from 'next/router';

interface Props {
  pageId: string;
  eventData: EventData;
}

export default function Event({ pageId, eventData }: Props) {
  const {
    userData: { linkedPageId, uid },
  } = useAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [teamId, setTeamId] = useState<string>('');

  let isPageOwner = linkedPageId === pageId ? true : false;

  useEffect(() => {
    if (eventData.id && uid) {
      db.collection('events')
        .doc(eventData.id)
        .collection('teams')
        .where('uids', 'array-contains', uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data()) {
              setIsRegistered(true);
              setTeamId(doc.id);
            }
          });
        });
    }
  }, [eventData.id, uid]);

  const unregisterHandler = () => {
    db.collection('events')
      .doc(eventData.id)
      .collection('teams')
      .doc(teamId)
      .delete();
    router.push('/');
  };

  return (
    <Aux>
      <Head>
        <title>Event</title>
        <meta name="description" content="Details and Registeration" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main
        className={
          'md:w-5/6 lg:w-2/3 mx-auto mt-2 ' +
          'relative flex flex-col md:rounded-md ' +
          'bg-gradient-to-b from-gray-900 to-black md:px-10'
        }
      >
        <EventDetails isPageOwner={isPageOwner} data={eventData} />
        {isPageOwner ? (
          <div>
            <SendNotification eventData={eventData} />
            <ParticipantList eventId={eventData.id} />
          </div>
        ) : (
          (null as any)
        )}
        {!isRegistered ? (
          {
            Squad: (
              <RegisterEventForm
                teamSize={4}
                setTeamId={setTeamId}
                gameCode={eventData.gameCode}
                eventId={eventData.id}
                setIsRegistered={setIsRegistered}
                eventData={eventData}
              />
            ),
            Duo: (
              <RegisterEventForm
                teamSize={2}
                setTeamId={setTeamId}
                gameCode={eventData.gameCode}
                eventId={eventData.id}
                setIsRegistered={setIsRegistered}
                eventData={eventData}
              />
            ),
            Solo: (
              <SoloRegistrationForm
                gameCode={eventData.gameCode}
                eventId={eventData.id}
                setIsRegistered={setIsRegistered}
                eventData={eventData}
              />
            ),
          }[eventData.mode]
        ) : (
          <div
            className={
              'py-10 px-4 flex flex-col gap-4 font-sans text-green-400 ' +
              'font-semibold text-xl text-center sm:text-left'
            }
          >
            <span>You have registered for this event!</span>
            <span>
              Get Room Id and Password will be available here before 15 minutes
              of event.
            </span>
            <span
              onClick={unregisterHandler}
              className={
                'text-gray-500 px-3 py-2 w-max text-lg rounded-md ' +
                'cursor-pointer hover:bg-red-400 hover:text-white active:bg-red-600'
              }
            >
              UNREGISTER
            </span>
          </div>
        )}
      </main>
    </Aux>
  );
}

interface IParams extends ParsedUrlQuery {
  pageId: string;
  eventId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageId, eventId } = context.params as IParams;
  const eventData = await fetchEventDataById(eventId);
  return {
    props: {
      eventData,
      pageId,
    },
  };
};
