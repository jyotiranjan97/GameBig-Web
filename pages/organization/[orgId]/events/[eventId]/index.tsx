import { useState } from 'react';
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
import SnackbarAlert from '@/components/UI/Snackbar/SnackBar';

interface Props {
  orgId: string;
  eventData: EventData;
}

export default function Event({ orgId, eventData }: Props) {
  const {
    userData: { linkedOrganizationId },
  } = useAuth();

  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  let isOrganizer = linkedOrganizationId === orgId ? true : false;

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
        <>
          <SendNotification eventData={eventData} />
          <ParticipantList tId={eventData.id} />
        </>
      ) : (
        <RegisterEventForm
          setIsAlertOpen={() => setIsAlertOpen(true)}
          gameCode={eventData.gameCode}
          tId={eventData.id}
        />
      )}
      <SnackbarAlert
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        autoHideDuration={3000}
        type="success"
        message={{ label: 'Registered', message: 'Registration Successful' }}
      />
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
