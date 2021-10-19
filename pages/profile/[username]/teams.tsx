import { useState } from 'react';
import Head from 'next/head';
import CreateTeam from '../../../components/Profile/createTeam';
import { db } from '../../../firebase/firebaseClient';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData, TeamType } from '../../../utilities/types';
import TeamIntro from '../../../components/Profile/TeamIntro';
import TeamItem from '../../../components/Profile/TeamItem';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../lib/getUser';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';

export default function Home({
  userData,
  teams,
}: {
  userData: UserData;
  teams: Array<TeamType>;
}) {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [currentTeams, setCurrentTeams] = useState(teams);
  const [selectedTeam, setSelectedTeam] = useState<TeamType | undefined>(
    undefined
  );
  const closeBackdrop = () => {
    setBackdropOpen(false);
  };
  const openBackdrop = () => {
    setBackdropOpen(true);
  };

  const removeTeam = (docId: string) => {
    const temp = currentTeams.filter((item) => {
      return docId !== item.docId;
    });
    setCurrentTeams(temp);
  };

  return (
    <Aux>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <ProfileHeader userData={userData} />
      <div>
        {currentTeams.length == 0 ? (
          currentTeams.map((team, index) => {
            return (
              <TeamItem
                team={team}
                key={index}
                openBackdrop={openBackdrop}
                setSelectedTeam={setSelectedTeam}
                removeTeam={removeTeam}
              />
            );
          })
        ) : (
          <TeamIntro openBackdrop={openBackdrop} />
        )}
      </div>
      <Backdrop isOpen={backdropOpen}>
        <CreateTeam teamData={selectedTeam} onCancel={closeBackdrop} />
      </Backdrop>
    </Aux>
  );
}

export async function getServerSideProps(context: {
  params: { username: string };
}) {
  const { username } = context.params;
  const userData = await getUser(username);

  const teams: Array<TeamType> = [];

  await db
    .collection('teams')
    .where('gamers', 'array-contains-any', [username])
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { teamName, gamers, inGameLead } = doc.data();
        teams.push({ teamName, gamers, inGameLead, docId: doc.id });
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return {
    props: { userData, teams },
  };
}
