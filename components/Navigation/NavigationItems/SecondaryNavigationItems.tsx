import { useRouter } from 'next/router';
import NavigationItem from './NavigationItem/NavigationItem';
import { useAuth } from '../../../context/authContext';
import NotificationIcon from '../../UI/Icons/NavIcons/Notification';
import ProfileIcon from '../../UI/Icons/NavIcons/Profile';

export default function SecondaryNavigationItems() {
  const { user } = useAuth();
  const router = useRouter();

  const handleButtonClick = async () => {
    await router.push('/auth');
  };

  return (
    <ul className="flex items-end space-x-2">
      {user.username ? (
        <>
          <NavigationItem
            href="/notification"
            isActive={router.pathname === '/notification'}
            toolTip="Notification"
          >
            <NotificationIcon
              isActive={router.pathname === '/notification'}
              size={36}
            />
          </NavigationItem>
          <NavigationItem
            href={`/profile/${user.username}`}
            isActive={
              router.pathname === '/profile/[username]' ||
              router.pathname === '/profile/[username]/teams' ||
              router.pathname === '/profile/[username]/edit'
            }
            toolTip="Profile"
          >
            <ProfileIcon
              isActive={
                router.pathname === '/profile/[username]' ||
                router.pathname === '/profile/[username]/teams' ||
                router.pathname === '/profile/[username]/edit'
              }
              size={36}
            />
          </NavigationItem>
        </>
      ) : (
        <div
          className="bg-indigo-600 hover:bg-indigo-800 font-semibold text-md my-1.5 md:my-2 py-2 px-2 text-gray-300 rounded-md cursor-pointer"
          onClick={handleButtonClick}
        >
          Sign&nbsp;In/ Sign&nbsp;Up
        </div>
      )}
    </ul>
  );
}
