import { useState, FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'next/image';
import { db } from '../../firebase/firebaseClient';
import SnackbarAlert from '../UI/Snackbar/SnackBar';
import { GamerData } from '../../utilities/types';
import FixedButton from '../UI/Buttons/FixedButton';
import NormalInput from '../UI/Inputs/NormalInput';

const validationSchema = yup.object({
  ingamename: yup.string().required('In Game Name is required'),
  ingameid: yup.string().required('In Game Id is required'),
});

const emptyValues = {
  ingamename: '',
  ingameid: '',
};

type Props = {
  username: string;
  game: {
    gameCode: string;
    name: string;
    imageSource: string;
  };
  oldValues?: GamerData;
  addToCurrentGames: (games: GamerData) => void;
};

const GameForm: FC<Props> = ({
  username,
  game,
  oldValues,
  addToCurrentGames,
}: Props) => {
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: { label: '', message: '' },
    severity: 'success' as const,
  });

  const handleSnackbarClose = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  const saveGame = async (gameData: {
    ingamename: string;
    ingameid: string;
  }) => {
    try {
      await db
        .collection('gamers')
        .add({ username: username, gameCode: game.gameCode, ...gameData });
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: { label: 'Saved', message: `${game.name} added!` },
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const updateGame = async (gameData: {
    ingamename: string;
    ingameid: string;
  }) => {
    try {
      await db.collection('gamers').doc(oldValues?.docId).update(gameData);
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: { label: 'Updated', message: `${game.name} updated!` },
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const formik = useFormik({
    initialValues: {
      ...emptyValues,
      ...oldValues,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const { ingameid, ingamename } = values;
      setSubmitting(true);
      if (oldValues) {
        updateGame({ ingameid, ingamename });
      } else {
        saveGame({ ingameid, ingamename });
      }
      addToCurrentGames(values);
      setSubmitting(false);
    },
  });

  return (
    <div
      className={
        'flex flex-col items-center w-11/12 mx-auto ' +
        'text-gray-300 font-sans font-semibold my-5 '
      }
    >
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 w-full">
        <div className="flex flex-col justify-evenly">
          <div className="md:h-44 md:w-44 h-24 w-24 relative rounded-lg mx-auto">
            <Image
              src={game.imageSource}
              alt="Picture of Game"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            className={
              'mx-auto text-lg px-4 text-center font-semibold text-gray-300 tracking-wide'
            }
          >
            {game.name}
          </div>
        </div>
        <form className="col-span-2 md:pt-10">
          <div className="flex flex-col justify-around">
            <NormalInput
              name="ingamename"
              placeHolder="In Game Name"
              value={formik.values.ingamename}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.ingamename)}
              errorMessage={formik.errors.ingamename}
            />
            <NormalInput
              name="ingameid"
              placeHolder="In Game ID"
              value={formik.values.ingameid}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.ingameid)}
              errorMessage={formik.errors.ingameid}
            />
          </div>
          <div className="flex justify-end mt-2 mr-1 md:mr-8">
            <FixedButton name="Add Info" onClick={formik.handleSubmit} />
          </div>
        </form>
      </div>
      <SnackbarAlert
        open={snackbarData.open}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        message={snackbarData.message}
        type={snackbarData.severity}
      />
    </div>
  );
};

export default GameForm;
