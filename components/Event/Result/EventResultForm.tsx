import { ChangeEvent, useState } from 'react';
import FormInput from '@/components/UI/Inputs/FormInput';
import SelectDropDown from '@/components/UI/Select/SelectDropDown';
import { TeamType } from '@/utilities/types';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import { db } from 'firebase/firebaseClient';

interface Props {
  participants: TeamType[];
  eventId: string;
}

type Positiontype = { name: string; id: string };

const positions = [
  { name: 'First', id: 1 },
  { name: 'Second', id: 2 },
  { name: 'Third', id: 3 },
];

const EventResultForm = ({ participants, eventId }: Props) => {
  const [winner, setWinner] = useState();
  const [prize, setPrize] = useState<string>('');
  const [position, setPosition] = useState<Positiontype>({} as Positiontype);

  const saveResults = async () => {
    await db
      .collection('events')
      .doc(eventId)
      .collection('winners')
      .doc(position.id)
      .set({ team: winner, prize, position: position.name });
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 md:gap-4 mx-6">
        <SelectDropDown
          name="position"
          label="Position"
          menuItems={positions}
          propToShow="name"
          handleChange={(item) => {
            setPosition(item);
          }}
        />
        <SelectDropDown
          name="winner"
          label="Winner"
          menuItems={participants}
          propToShow="teamName"
          handleChange={(item) => {
            setWinner(item);
          }}
        />
        <div className="w-full">
          <FormInput
            name="prize"
            labelName="Prize"
            onChangeHandler={(e: ChangeEvent) => {
              const target = e.target as HTMLInputElement;
              setPrize(target.value);
            }}
            value={prize}
          />
        </div>
      </div>
      <div className="mx-8">
        <FixedButton
          name="Declare Winners"
          type="submit"
          onClick={saveResults}
        />
      </div>
    </div>
  );
};

export default EventResultForm;
