import { ChangeEvent, useState } from 'react';
import { db } from '../../firebase/firebaseClient';
import { BasicUserType, TeamType } from '../../utilities/types';
import FormInput from '../UI/Inputs/FormInput';
import FixedButton from '../UI/Buttons/FixedButton';
import algoliaClient from '@/libs/algolia';
import debounce from '@/libs/debounce';
import { useUI } from '@/context/uiContext';
import { useAuth } from '@/context/authContext';
import GamersList from './GamersList';

type PropsType = {
  teamData?: TeamType;
  teamId: string;
  onCancel: () => void;
  handleSubmit?: (teamData: TeamType) => void;
  setPart: (num: number) => void;
};

export default function CreateTeam({
  teamData,
  onCancel,
  teamId,
  setPart,
}: PropsType) {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();
  const [gamers, setgamers] = useState<BasicUserType[]>(
    teamData?.gamers || [
      {
        uid: userData.uid,
        username: userData.username,
        name: userData.name,
        photoURL: userData.photoURL,
      },
    ]
  );
  const [invitedGamers, setInvitedGamers] = useState<BasicUserType[]>(
    teamData?.invitedGamers || []
  );
  const [query, setQuery] = useState('');
  const [searchResults, setSearchresults] = useState<BasicUserType[]>([]);

  const inviteGamer = async (user: BasicUserType) => {
    if (
      invitedGamers.find((o) => (o.uid === user.uid ? true : false)) ||
      gamers.find((o) => (o.uid === user.uid ? true : false))
    ) {
      return;
    }
    setInvitedGamers([...invitedGamers, user]);
  };

  const notifyUser = async (uid: string) => {
    db.collection('users')
      .doc(uid)
      .collection('notifications')
      .add({
        message: `${userData.name} invited you to join a team`,
        type: 'TEAM_INVITE',
      });
  };

  const removeGamer = (user: BasicUserType) => {
    const newgamers = gamers.filter((gamer) => gamer.uid !== user.uid);
    setgamers(newgamers);
  };

  const removeInvitedGamer = (user: BasicUserType) => {
    const gamers = invitedGamers.filter((gamer) => gamer.uid !== user.uid);
    setInvitedGamers(gamers);
  };

  const searchUser = (query: string) => {
    if (query.trim() === '') return;
    const index = algoliaClient.initIndex('users');
    index
      .search(query, {
        attributesToRetrieve: ['username', 'name', 'uid', 'photoURL'],
        hitsPerPage: 5,
      })
      .then(({ hits }) => {
        const results: BasicUserType[] = [];
        hits.map((hit: any) => {
          results.push({
            username: hit.username,
            name: hit.name,
            uid: hit.uid,
            photoURL: hit.photoURL,
          });
        });
        setSearchresults(results);
      });
  };

  const save = async () => {
    db.collection('teams')
      .doc(teamId)
      .update({
        gamers,
        invitedGamers,
        uids: gamers.map((gamer) => gamer.uid),
        invitedUids: invitedGamers.map((gamer) => gamer.uid),
      });
    invitedGamers.map((user) => {
      notifyUser(user.uid);
    });
    openSnackBar({
      label: 'Invitation sent',
      message: '',
      type: 'success',
    });
    onCancel();
  };

  return (
    <div className="rounded-lg w-full h-full text-gray-300 font-sans font-semibold flex flex-col">
      <span className="text-2xl text-center mb-8">
        Invite Gamers to Join your Team
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col mx-8">
          <div className="w-full">
            <FormInput
              labelName=""
              name="username"
              placeHolder="search username or name"
              value={query}
              onChangeHandler={(e: ChangeEvent) => {
                const target = e.target as HTMLInputElement;
                setQuery(target.value);
                const debouncedGetSearch = debounce(
                  () => searchUser(target.value),
                  500
                );
                if (target.value.trim() !== '') {
                  debouncedGetSearch();
                } else {
                  setSearchresults([]);
                }
              }}
            />
          </div>
          <GamersList
            header="Search results"
            gamers={searchResults}
            handleItemClick={inviteGamer}
            buttonText="Invite"
            highLightButton={true}
          />
        </div>
        <div className="flex flex-col mx-8">
          <GamersList
            header="Invited Gamers"
            gamers={invitedGamers}
            handleItemClick={removeInvitedGamer}
            buttonText="Remove"
            highLightButton={false}
          />
          <GamersList
            header="Gamers"
            gamers={gamers}
            handleItemClick={removeGamer}
            buttonText="Remove"
            highLightButton={false}
          />
        </div>
      </div>
      <div className="flex justify-evenly w-full py-8">
        <FixedButton type="submit" name="Previous" onClick={() => setPart(0)} />
        <FixedButton type="submit" name="Save" onClick={save} />
      </div>
    </div>
  );
}
