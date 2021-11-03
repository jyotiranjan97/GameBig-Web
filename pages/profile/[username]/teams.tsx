import { useState } from 'react';
import Head from 'next/head';
import CreateTeam from '../../../components/Profile/createTeam';
import { db } from '../../../firebase/firebaseClient';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData, TeamType } from '../../../utilities/types';
import TeamIntro from '../../../components/Profile/TeamIntro';
import TeamItem from '../../../components/Profile/TeamItem';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../libs/getUser';
import FixedButton from '../../../components/UI/Buttons/FixedButton';
import { useAuth } from '../../../context/authContext';
import Modal from '@/components/UI/Modal/Modal';

export default function Home({
  userData,
  teams,
}: {
  userData: UserData;
  teams: Array<TeamType>;
}) {
  const { userData: user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTeams, setCurrentTeams] = useState(teams);
  const [selectedTeam, setSelectedTeam] = useState<TeamType | undefined>(
    undefined
  );
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
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
        <meta
          name="description"
          content="Create a Team with your friends to fight with the elite gamers on GameBig Today"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <ProfileHeader userData={userData} />
      <div className="w-11/12 md:w-5/6 xl:w-1/2 mx-auto mt-2">
        <div className="flex justify-end">
          {userData.username === user.username ? (
            <FixedButton name="Create Team" onClick={openModal} />
          ) : null}
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {currentTeams.length !== 0 ? (
            currentTeams.map((team, index) => {
              return (
                <TeamItem
                  team={team}
                  key={index}
                  openModal={openModal}
                  setSelectedTeam={setSelectedTeam}
                  removeTeam={removeTeam}
                />
              );
            })
          ) : (
            <TeamIntro openModal={openModal} />
          )}
        </div>
      </div>
      <Modal isOpen={modalOpen}>
        <CreateTeam teamData={selectedTeam} onCancel={closeModal} />
      </Modal>
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
