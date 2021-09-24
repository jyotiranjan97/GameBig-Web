import { useState } from 'react';
import Head from 'next/head';
import nookies from 'nookies';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import { useAuth } from '../../../context/authContext';
import { firebaseAdmin } from '../../../firebase/firebaseAdmin';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData, GamerData } from '../../../utilities/types';
import GameItem from '../../../components/Profile/GameItem';
import GameForm from '../../../components/Auth/GameForm';
import { games as allSupportedGames } from '../../../utilities/GameList';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../lib/getUser';
import getGamerData from '../../../lib/getGamerData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      width: '100%',
      background: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export default function Home({
  userData,
  savedGames,
}: {
  userData: UserData;
  savedGames: Array<GamerData>;
}) {
  const classes = useStyles();
  const { user, signout } = useAuth();
  const [open, setOpen] = useState(false);
  const [currentGames, setCurrentGames] = useState(savedGames);

  const handleClose = () => {
    setOpen(false);
  };
  const removeGame = (docId: string) => {
    const temp = currentGames.filter((gameItem) => {
      return docId !== gameItem.docId;
    });
    setCurrentGames(temp);
  };

  const addToCurrentGames = (game: GamerData) => {
    setCurrentGames([...currentGames, game]);
  };

  const getOldValues = (key: string) => {
    return currentGames.find((element) => element.gameCode === key);
  };

  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <ProfileHeader userData={userData} tabNumber={0} />
        <div>
          {userData.username === user.username ? (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
            >
              Add Game
            </Button>
          ) : null}
        </div>
        <div>
          {currentGames.map((game, index) => {
            return (
              <GameItem
                game={game}
                key={index}
                removeGame={removeGame}
                setBackdrop={setOpen}
              />
            );
          })}
        </div>
        <Button onClick={signout}>Sign Out</Button>
        <Backdrop className={classes.backdrop} open={open}>
          {Object.keys(allSupportedGames).map(function (key, index) {
            return (
              <GameForm
                isUpdating={true}
                username={userData.username}
                game={allSupportedGames[key]}
                key={key}
                oldValues={getOldValues(key)}
                addToCurrentGames={addToCurrentGames}
              />
            );
          })}
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </Backdrop>
      </Aux>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let savedGames: GamerData[] = [];
  let userData: UserData = {} as UserData;
  try {
    const cookies = nookies.get(context);
    await firebaseAdmin
      .auth()
      .verifyIdToken(cookies.token)
      .then(async () => {
        const { username } = context.query;
        if (typeof username == 'string') {
          userData = await getUser(username);
          savedGames = await getGamerData(username);
        }
      });
    return {
      props: { userData, savedGames },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: '/auth' });
    context.res.end();
    console.log('Error getting server side props:', err);
    return { props: {} as never };
  }
}
