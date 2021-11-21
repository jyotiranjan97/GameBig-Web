import { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import * as yup from 'yup';
import { db } from '../../firebase/firebaseClient';
import { BasicUserType, TeamType } from '../../utilities/types';
import FormInput from '../UI/Inputs/FormInput';
import FixedButton from '../UI/Buttons/FixedButton';
import algoliaClient from '@/libs/algolia';
import debounce from '@/libs/debounce';
import SelectDropDown from '../UI/Select/SelectDropDown';
import LoadingLottie from '../UI/Loaders/Dots';
import { useUI } from '@/context/uiContext';
import { getUserByUsername } from '@/libs/user';
import { useAuth } from '@/context/authContext';
import HorizontalProfile from '../Profile/HorizontalProfile';

const validationSchema = yup.object({
  teamName: yup.string().required('Team name is required'),
  username: yup.string(),
  inGameLead: yup.string().required('In Game Lead is required'),
});

type PropsType = {
  teamData?: TeamType;
  teamSize?: number;
  onCancel: () => void;
  handleSubmit?: (teamData: TeamType) => void;
  setPart: (num: number) => void;
};

const emptyValues = {
  username: '',
  teamName: '',
  inGameLead: '',
};

export default function CreateTeam({ teamData, handleSubmit }: PropsType) {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();

  const [loading, setLoading] = useState(false);
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

  const addgamer = async (user: BasicUserType) => {
    if (
      invitedGamers.find((o) => (o.uid === user.uid ? true : false)) ||
      gamers.find((o) => (o.uid === user.uid ? true : false))
    ) {
      setLoading(false);
      return;
    }
    setInvitedGamers([...invitedGamers, user]);
    notifyUser(user.uid);
  };

  const notifyUser = async (uid: string) => {
    db.collection('users')
      .doc(uid)
      .collection('notification')
      .add({ data: { teamData }, type: 'TEAM_INVITE' });
  };

  const removegamer = (uid: string) => {
    const newgamers = gamers.filter((gamer) => gamer.uid !== uid);
    setgamers(newgamers);
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

          {searchResults.length > 0 && (
            <div className="w-full flex flex-col">
              <span>Search Results</span>
              {searchResults.map((gamer, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between my-1 md:pr-4 rounded-md bg-gray-800"
                >
                  <HorizontalProfile user={gamer} />
                  <span
                    className="bg-indigo-600 py-2 px-4 mr-3 rounded cursor-pointer"
                    onClick={() => {
                      console.log(gamer);
                    }}
                  >
                    Invite
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col mx-8">
          <div className="w-full flex flex-col">
            <span>Gamers</span>
            {gamers.map((gamer, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-between my-1 md:pr-4 rounded-md bg-gray-800"
              >
                <HorizontalProfile user={gamer} />
                {gamer.uid !== userData.uid ? (
                  <span
                    className="hover:bg-gray-700 py-2 px-4 rounded"
                    onClick={() => {
                      removegamer(gamer.uid);
                    }}
                  >
                    Remove
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col">
            <span>Invited Gamers</span>
            {invitedGamers.map((gamer, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-between my-1 md:pr-4 rounded-md bg-gray-800"
              >
                <HorizontalProfile user={gamer} />
                {gamer.uid !== userData.uid ? (
                  <span
                    className="hover:bg-gray-700 py-2 px-4 rounded"
                    onClick={() => {
                      removegamer(gamer.uid);
                    }}
                  >
                    Remove
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
