import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.scss';
import { useAuth } from '../../../context/authContext';

type Props = {
  clicked?: () => void;
};

export default function NavigationItems({ clicked }: Props) {
  const {
    user,
    userData: { linkedOrganizationId },
  } = useAuth();
  return (
    <ul className={classes.NavigationItems} onClick={clicked}>
      <NavigationItem href="/">Tournaments</NavigationItem>
      <NavigationItem
        href={
          linkedOrganizationId
            ? `/organization/${linkedOrganizationId}/tournaments`
            : `/organization`
        }
      >
        Organizations
      </NavigationItem>
      <NavigationItem href="/contact">Contact&nbsp;Us</NavigationItem>
      {user.username ? (
        <NavigationItem href={`/profile/${user.username}`}>
          Profile
        </NavigationItem>
      ) : (
        <NavigationItem href="/auth">Sign&nbsp;In </NavigationItem>
      )}
    </ul>
  );
}
