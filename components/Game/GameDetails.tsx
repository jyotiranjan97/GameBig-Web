import { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import ResponsiveButton from '../UI/Buttons/ResponsiveButton';
import TextButton from '../UI/Buttons/TextButton';
import FormInput from '../UI/Inputs/FormInput';
import TextArea from '../UI/Inputs/TextArea';
import { games } from '@/utilities/GameList';

type Props = {
  updatePage: (page: number) => void;
  game: string;
  setGame: Dispatch<SetStateAction<string>>;
};

const GameDetails: FC<Props> = ({ updatePage, game, setGame }) => {
  const initialValues = {
    inGameId: '',
    inGameName: '',
    kd: '',
    highestTier: '',
    damage: '',
    kills: '',
    about: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  function backClicked() {
    updatePage(1);
    setGame('');
  }

  return (
    <div className="relative w-11/12 mx-auto mb-10">
      <section className="flex justify-start absolute -top-20 md:left-5">
        <TextButton name="Back" type="fail" onClick={backClicked} />
      </section>
      <div className="w-5/6 mx-auto">
        {/** Game Name and Icon */}
        <div className="flex flex-row space-x-8">
          <section className="h-16 w-16 md:h-12 md:w-12 relative rounded-lg overflow-hidden">
            <Image
              src={games[game].imageSource}
              alt="Game Logo"
              layout="fill"
              objectFit="contain"
            />
          </section>
          <h5 className="text-indigo-500 text-xl font-semibold tracking-wide my-auto cursor-default">
            {games[game].name}
          </h5>
        </div>

        {/** Form Input */}
        <p className="font-semibold text-gray-600 mt-7 mb-5 cursor-default">
          Fill the details below and let others know how cool you are 😎
        </p>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:gap-x-10 gap-x-5">
          <FormInput
            labelName="In Game ID"
            name="inGameId"
            value={formik.values.inGameId}
            onChangeHandler={formik.handleChange}
          />
          <FormInput
            labelName="In Game Name"
            name="inGameName"
            value={formik.values.inGameName}
            onChangeHandler={formik.handleChange}
          />
          <FormInput
            labelName="K/D"
            name="kd"
            value={formik.values.kd}
            onChangeHandler={formik.handleChange}
          />
          <FormInput
            labelName="Highest Tier Reached"
            name="highestTier"
            value={formik.values.highestTier}
            onChangeHandler={formik.handleChange}
          />
          <FormInput
            labelName="Highest Damage"
            name="damage"
            value={formik.values.damage}
            onChangeHandler={formik.handleChange}
          />
          <FormInput
            labelName="Highest Kills"
            name="kills"
            value={formik.values.kills}
            onChangeHandler={formik.handleChange}
          />
          <div className="sm:col-span-2">
            <TextArea
              labelName="Your achievements / speciality"
              placeHolder={
                'e.g -\n' +
                "I'm a Sniperer with decent mid-combat skills and excellent in throwables." +
                '\nOwn 2019 PUBGM global championship squad mode, by playing with Awsome Esports.'
              }
              name="about"
              value={formik.values.about}
              onChangeHandler={formik.handleChange}
            />
          </div>
        </section>
      </div>

      {/** Submit Button */}
      <section className="bottom-5 w-5/6 mx-auto">
        <ResponsiveButton name="Save" />
      </section>
    </div>
  );
};

export default GameDetails;
