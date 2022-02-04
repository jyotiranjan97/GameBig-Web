import axios from 'axios';
import useSWR from 'swr';
import { EventData } from '@/utilities/eventItem/types';
import { TeamType } from '@/utilities/types';
import WhatsApp from '@/components/UI/Icons/SocialIcons/WhatsApp';

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
                <th>Team</th>
                <th>Slot No.</th>
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
                    <td className="ml-6">{team.teamName}</td>
                    <td className="ml-6">{team.slotNumber || 'NA'}</td>
                    <td
                      onClick={() => {
                        window.open(
                          `https://api.whatsapp.com/send?phone=+91${team.phoneNumber}`
                        );
                      }}
                      className="text-center ml-6 underline"
                    >
                      <div className="flex items-center gap-1">
                        {team.phoneNumber} <WhatsApp size={22} />
                      </div>
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
