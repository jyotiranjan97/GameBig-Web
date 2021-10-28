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
import { fetchEventDataById } from '../../../../../lib/getEventData';
import { EventData } from '../../../../../utilities/eventItem/types';
import SoloRegistrationForm from '../../../../../components/Event/Register/SoloRegistrationForm';
import { db } from '../../../../../firebase/firebaseClient';

interface Props {
  orgId: string;
  eventData: EventData;
}

export default function Event({ orgId, eventData }: Props) {
  const {
    userData: { linkedOrganizationId, username },
  } = useAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [teamId, setTeamId] = useState<string>('');

  let isOrganizer = linkedOrganizationId === orgId ? true : false;

  useEffect(() => {
    if (eventData.id && username) {
      db.collection('events')
        .doc(eventData.id)
        .collection('teams')
        .where('usernames', 'array-contains', username)
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
  }, [eventData.id, username]);

  const unregister = () => {
    db.collection('events').doc(eventData.id).collection('teams').doc(teamId)
      .delete;
  };

  return (
    <Aux>
      <Head>
        <title>Event</title>
        <meta name="description" content="Details and Registeration" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <EventDetails isOrganizer={isOrganizer} data={eventData} />
      {isOrganizer ? (
        <div>
          <SendNotification eventData={eventData} />
          <ParticipantList tId={eventData.id} />
        </div>
      ) : (
        (null as any)
      )}
      {!isRegistered ? (
        {
          Squad: (
            <RegisterEventForm
              teamSize={4}
              gameCode={eventData.gameCode}
              eventId={eventData.id}
              setIsRegistered={setIsRegistered}
            />
          ),
          Duo: (
            <RegisterEventForm
              teamSize={2}
              gameCode={eventData.gameCode}
              eventId={eventData.id}
              setIsRegistered={setIsRegistered}
            />
          ),
          Solo: (
            <SoloRegistrationForm
              gameCode={eventData.gameCode}
              tId={eventData.id}
              setIsRegistered={setIsRegistered}
            />
          ),
        }[eventData.mode]
      ) : (
        <div className="p-10 flex flex-col gap-4 font-sans text-gray-500 font-semibold text-xl">
          <span>You have already registered for this event</span>
          <span
            onClick={unregister}
            className="text-gray-400 bg-gray-800 hover:bg-gray-700 rounded-md p-3 w-32"
          >
            Unregister
          </span>
        </div>
      )}
    </Aux>
  );
}

interface IParams extends ParsedUrlQuery {
  orgId: string;
  eventId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orgId, eventId } = context.params as IParams;
  const eventData = await fetchEventDataById(eventId);
  return {
    props: {
      eventData,
      orgId,
    },
  };
};
