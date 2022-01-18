import axios from 'axios';
import useSWR from 'swr';
import { EventData } from '@/utilities/eventItem/types';
import { TeamType } from '@/utilities/types';

const { BASE_URL } = process.env;

type Props = {
  eventData: EventData;
};

async function getData(arg: string) {
  const response = await axios.get(arg);
  return response.data.data as TeamType[];
}

export default function ParticipantList({ eventData }: Props) {
  const { data: participants } = useSWR(
    `${BASE_URL}/api/participants/?eventId=${eventData._id}`,
    getData
  );

  if (!participants) return null;

  const IGL = ({ team }: { team: TeamType }) => (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-400 font-sans font-semibold">
          In Game Name
        </span>
        <span className="text-base text-gray-50 font-sans font-semibold">
          {team.gamerDetails[0].inGameId}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-400 font-sans font-semibold">
          In Game ID
        </span>
        <span className="text-base text-gray-50 font-sans font-semibold">
          {team.gamerDetails[0].inGameName}
        </span>
      </div>
    </div>
  );

  return (
    <div className="my-6 mx-2 rounded-md text-center">
      {participants.length === 0 ? (
        <span className="text-lg font-semibold text-gray-100">
          No Teams have registered yet
        </span>
      ) : (
        <div className="pb-6">
          <table className="table-auto border-collapse w-full text-gray-50">
            <thead className="text-center">
              <tr className="rounded-lg text-sm md:text-lg font-semibold text-indigo-500">
                <th>Slot No.</th>
                <th>Team</th>
                <th>IGL</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody className="text-lg font-sans text-gray-100 text-center">
              {participants.map((team, index) => {
                return (
                  <tr
                    className="bg-gray-700 table-row h-10 border-b-2 border-gray-600 rounded-md space-y-1"
                    key={index}
                  >
                    <td className="ml-6">{team.slotNumber}</td>
                    <td className="ml-6">{team.teamName}</td>
                    <td className="ml-6">
                      <IGL team={team} />
                    </td>
                    <td
                      onClick={() => {
                        window.open(
                          `https://api.whatsapp.com/send?phone=+91${team.phoneNumber}`
                        );
                      }}
                      className="ml-6 underline"
                    >
                      {team.phoneNumber}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
