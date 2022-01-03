import { useRouter } from 'next/router';
import NavigationItem from './NavigationItem/NavigationItem';
import PageIcon from '../../UI/Icons/NavIcons/PageIcon';
import TrophyIcon from '../../UI/Icons/NavIcons/TrophyIcon';
import FriendsIcon from '../../UI/Icons/NavIcons/FriendsIcon';
import JoinIcon from '../../UI/Icons/NavIcons/JoinIcon';
import { useMessages } from '@/context/messageContext';

export default function PrimaryNavigationItems() {
  const router = useRouter();
  const { unseen } = useMessages();

  return (
    <ul className="hidden md:flex items-end lg:space-x-10 lg:mr-20">
      <NavigationItem
        href="/events"
        isActive={router.pathname === '/events'}
        toolTip="Events"
      >
        <TrophyIcon isActive={router.pathname === '/events'} size={33} />
      </NavigationItem>
      <NavigationItem
        href="/openings"
        isActive={router.pathname === '/openings'}
        toolTip="Openings"
      >
        <JoinIcon isActive={router.pathname === '/openings'} size={33} />
      </NavigationItem>

      <NavigationItem
        href={`/page`}
        isActive={
          router.pathname === '/page/[pageId]/events' ||
          router.pathname === '/page/[pageId]' ||
          router.pathname === '/page' ||
          router.pathname === '/page/create'
        }
        toolTip="Page"
      >
        <PageIcon
          isActive={
            router.pathname === '/page/[pageId]/events' ||
            router.pathname === '/page/[pageId]' ||
            router.pathname === '/page' ||
            router.pathname === '/page/create'
          }
          size={33}
        />
      </NavigationItem>
      <NavigationItem
        href="/people"
        isActive={router.pathname === '/people'}
        toolTip="People"
      >
        <FriendsIcon isActive={router.pathname === '/people'} size={36} />
      </NavigationItem>
    </ul>
  );
}
