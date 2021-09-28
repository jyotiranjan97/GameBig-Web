import {
  Avatar,
  createStyles,
  Theme,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { LocationOnRounded } from '@material-ui/icons';
import Head from 'next/head';
import TabNavigator from '../../Navigation/TabNavigation/TabNavigator';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { useAuth } from '../../../context/authContext';
import { OrgFormData } from '../../../utilities/organization/types';

interface Props {
  tabNumber: number;
  data: OrgFormData;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoContainer: {
      display: 'flex',
      marginBlock: 20,
    },
    infoTextContainer: {
      marginInline: 30,
      paddingBlock: 10,
    },
    element: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 5,
      marginTop: 5,
    },
    avatar: {
      backgroundColor: red[500],
      height: theme.spacing(10),
      width: theme.spacing(10),
    },
  })
);

export default function HeaderOrg({ tabNumber, data }: Props) {
  const classes = useStyles();

  const {
    userData: { linkedOrganizationId },
  } = useAuth();
  const tabs = [
    {
      label: 'Events',
      href: `/organization/${linkedOrganizationId}/tournaments`,
    },
    { label: 'About', href: `/organization/${linkedOrganizationId}` },
  ];

  return (
    <Aux>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className={classes.infoContainer}>
        <Avatar alt="SE" className={classes.avatar}>
          {data.name[0]}
        </Avatar>
        <div className={classes.infoTextContainer}>
          <Typography variant="h5" color="textPrimary">
            {data.name}
          </Typography>
          <div className={classes.element}>
            <LocationOnRounded fontSize="small" />
            <Typography
              variant="body1"
              color="textSecondary"
              component="body"
              display="inline"
            >
              {data.location}
            </Typography>
          </div>
        </div>
      </div>
      <TabNavigator tabNumber={tabNumber} tabs={tabs} />
    </Aux>
  );
}
