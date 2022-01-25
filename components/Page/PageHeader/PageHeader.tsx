import { FC } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TabNavigator from '@/components/Navigation/TabNavigation/TabNavigator';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { PageFormData } from '@/utilities/page/types';
import LocationIcon from '@/components/UI/Icons/EventIcons/LocationIcon';
import TextButton from '@/components/UI/Buttons/TextButton';
import { useAuth } from '@/context/authContext';

type Props = {
  data: PageFormData;
};

const PageHeader: FC<Props> = ({ data }: Props) => {
  const router = useRouter();
  const {
    userData: { uid },
  } = useAuth();

  const TABS = [
    {
      label: 'Events',
      href: `/page/${data.id}/events`,
      pathName: '/page/[pageId]/events',
    },
    {
      label: 'About',
      href: `/page/${data.id}`,
      pathName: '/page/[pageId]',
    },
  ];

  return (
    <Aux>
      <Head>
        <title>{data.name}</title>
        <meta
          name="description"
          content={`${data.name} is located at ${data.location} Organizes events and mathces in COD, PUBG and freefire`}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="flex flex-row xl:w-1/2 md:w-5/6 mx-auto px-6 my-2 md:my-8 justify-between items-center">
        <div className="flex items-center">
          {/** Avatar Logo */}
          <div className="flex w-12 h-12 md:w-16 md:h-16 bg-indigo-600 rounded-full items-center my-auto">
            <span className="self-center text-2xl md:text-4xl font-bold tracking-wide text-gray-900 font-sans m-auto">
              {data.name[0]}
            </span>
          </div>
          <div className="ml-1.5 md:ml-5">
            {/** Org Name */}
            <span className="text-gray-300 text-lg md:text-2xl font-semibold font-sans ml-1 md:ml-2">
              {data.name}
            </span>

            {/** Location */}
            <div className="flex flex-row md:mt-2">
              {data.location ? (
                <LocationIcon
                  size={25}
                  className={'fill-current text-indigo-400'}
                />
              ) : null}
              <span className="text-gray-400 text-lg ml-2 font-sans">
                {data.location}
              </span>
            </div>
          </div>
        </div>
        {data.admins.includes(uid) ? (
          <TextButton
            name="EDIT"
            onClick={() => router.push(`/page/${data.id}/edit`)}
            type="normal"
          />
        ) : null}
      </div>
      <TabNavigator tabs={TABS} />
    </Aux>
  );
};

export default PageHeader;
