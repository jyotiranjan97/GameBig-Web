import Head from 'next/head';
import PageHeader from '../../../../components/Page/PageHeader/PageHeader';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import EventCard from '../../../../components/Event/EventCard/EventCard';
import CreateEventButton from '../../../../components/Event/CreateEvent/CreateEventButton';
import { PageFormData } from '../../../../utilities/page/types';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { fetchPageData } from '../../../../libs/fetchPageData';
import { fetchEventsDataByPageId } from '../../../../libs/getAllEvents';
import { EventData } from '../../../../utilities/eventItem/types';

interface Props {
  pageData: PageFormData | undefined;
  events: EventData[];
}

export default function Events({ pageData, events }: Props) {
  return (
    <Aux>
      <Head>
        <title>Create an Event</title>
        <meta
          name="description"
          content="List of all upcoming events on GameBig"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      {pageData ? (
        <>
          <PageHeader data={pageData} />
          {pageData.id && pageData.category === 'organizer' ? (
            <CreateEventButton pageId={pageData.id} />
          ) : null}
          {events.map((eventItem: EventData) => (
            <EventCard
              key={eventItem.id}
              data={eventItem}
              isPageOwner={false}
            />
          ))}
        </>
      ) : (
        <div>Network Error</div>
      )}
    </Aux>
  );
}

interface IParams extends ParsedUrlQuery {
  pageId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageId } = context.params as IParams;
  let pageData = undefined;
  pageData = await fetchPageData(pageId);
  let events = await fetchEventsDataByPageId(pageId);
  events = events === undefined ? [] : events;
  return {
    props: {
      pageData,
      events,
    },
  };
};
