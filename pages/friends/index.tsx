import { GetServerSidePropsContext } from 'next';
import ProfileCard from '../../components/Friends/ProfileCard';
import TabNavigator from '../../components/Navigation/TabNavigation/TabNavigator';
import { useAuth } from '../../context/authContext';
import { firebaseAdmin } from '../../firebase/firebaseAdmin';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { UserData } from '../../utilities/types';

type Props = {
  friendsSuggestions: UserData[];
};

const FriendsSuggestions = ({ friendsSuggestions }: Props) => {
  const { userData, receivedFriendRequests } = useAuth();
  const tabs = [
    {
      label: 'Suggestions',
      href: `/friends`,
      pathName: '/friends',
    },
    {
      label: 'Friends',
      href: `/friends/${userData.username}`,
      pathName: '/friends/[username]',
    },
  ];
  return (
    <Aux>
      <div className="flex flex-col">
        <div className="mt-2">
          <TabNavigator tabs={tabs} />
        </div>
        {receivedFriendRequests.length > 0 && (
          <div className="flex flex-col xl:w-1/2 md:w-5/6 bg-gray-800 rounded-lg py-4 mx-auto mt-1">
            <span className="text-left px-8 text-xl font-semibold text-gray-100 py-2 mt-1">
              Friend Requests
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {receivedFriendRequests.map((friendRequest) => (
                <div key={friendRequest.sender.uid}>
                  <ProfileCard
                    name={friendRequest.sender.name}
                    games={[]}
                    username={friendRequest.sender.username}
                    photoURL={friendRequest.sender.photoURL}
                    uid={friendRequest.sender.uid}
                    receiverUid={friendRequest.receiverUid}
                    id={friendRequest.id}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="xl:w-1/2 md:w-5/6 grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4 pt-1 mx-auto">
          {friendsSuggestions.map((suggestion) => (
            <div key={suggestion.uid}>
              <ProfileCard
                name={suggestion.name}
                games={[]}
                username={suggestion.username}
                photoURL={suggestion.photoURL}
                uid={suggestion.uid}
              />
            </div>
          ))}
        </div>
      </div>
    </Aux>
  );
};

export default FriendsSuggestions;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const friendsSuggestions = [] as any[];

  await firebaseAdmin
    .firestore()
    .collection('users')
    .limit(40)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        friendsSuggestions.push({
          ...data,
          docId: doc.id,
          dob: data.dob ? data.dob.toDate().toISOString() : null,
        });
      })
    )
    .catch((err) => console.log(err));

  return {
    props: { friendsSuggestions },
  };
}
