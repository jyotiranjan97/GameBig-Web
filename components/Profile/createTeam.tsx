import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SnackbarAlert from '../UI/Snackbar/SnackBar';
import { db } from '../../firebase/firebaseClient';
import { TeamType } from '../../utilities/types';
import FormInput from '../UI/Inputs/FormInput';
import FixedButton from '../UI/Buttons/FixedButton';
import SelectDropDown from '../UI/Select/SelectDropDown';
import LoadingLottie from '../UI/Loaders/Dots';

const validationSchema = yup.object({
  teamName: yup.string().required('Team name is required'),
  username: yup.string(),
  inGameLead: yup.string().required('In Game Lead is required'),
});

type PropsType = {
  teamData?: TeamType;
  onCancel: () => void;
  handleSubmit?: (teamData: TeamType) => void;
};

type SnackbarDataType = {
  open: boolean;
  severity: 'success' | 'info' | 'warning' | 'error';
  message: {
    label: string;
    message: string;
  };
};

const emptyValues = {
  username: '',
  teamName: '',
  inGameLead: '',
};

const initialSnackbarData = {
  open: false,
  message: { label: '', message: '' },
  severity: 'warning' as const,
};

export default function CreateTeam({
  teamData,
  onCancel,
  handleSubmit,
}: PropsType) {
  const [loading, setLoading] = useState(false);
  const [gamers, setgamers] = useState<Array<string>>(teamData?.gamers || []);
  const [snackbarData, setSnackbarData] =
    useState<SnackbarDataType>(initialSnackbarData);

  const formik = useFormik({
    initialValues: {
      ...emptyValues,
      teamName: teamData?.teamName,
      inGameLead: teamData?.teamName,
    },
    validationSchema: validationSchema,
    onSubmit: ({ teamName, inGameLead }, { setSubmitting }) => {
      setSubmitting(true);
      if (teamName && inGameLead) {
        saveTeam({ teamName, gamers, inGameLead });
        if (handleSubmit) handleSubmit({ teamName, gamers, inGameLead });
      }
      formik.resetForm();
      setSubmitting(false);
    },
  });

  const handleClose = () => {
    setSnackbarData(initialSnackbarData);
  };

  const saveTeam = async (team: TeamType) => {
    if (gamers.length !== 4) {
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: {
          label: 'Oops!',
          message: `You need 4 gamers to create a Team`,
        },
        severity: 'warning' as const,
      });
      return;
    }
    if (!team.inGameLead) {
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: {
          label: 'Oh Oh!',
          message: `You need a In Game Lead to create a Team!`,
        },
        severity: 'warning' as const,
      });
      return;
    }
    try {
      await db.collection('teams').add(team);
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: { label: 'Yay!', message: `${team.teamName} added!` },
        severity: 'success' as const,
      });
      onCancel();
    } catch (err) {
      console.log('err', err);
    }
  };

  const isUserValid = async (username: string) =>
    await db
      .collection('users')
      .where('username', '==', username)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });

  const addgamer = async () => {
    setLoading(true);
    const { username } = formik.values;
    if (username === '' || gamers.indexOf(username) !== -1) {
      formik.setFieldValue('username', '');
      setLoading(false);
      return;
    }
    const userValidity = await isUserValid(username);
    if (userValidity) {
      setgamers([...gamers, username]);
      formik.setFieldValue('username', '');
    } else {
      formik.setErrors({ username: 'No User exist with this username' });
    }
    setLoading(false);
  };

  const removegamer = (id: string) => {
    const newgamers = gamers.filter((gamer) => gamer !== id);
    setgamers(newgamers);
  };

  return (
    <div className="bg-gray-900 rounded-lg w-11/12 md:w-1/2 text-gray-300 font-sans font-semibold m-auto py-10">
      <span className="text-2xl py-6 ml-10">Create Your Dream Team</span>
      <div className="grid grid-cols-1 md:grid-cols-2 m-10">
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <FormInput
            labelName="Team Name"
            name="teamName"
            value={formik.values.teamName}
            placeHolder="Awsome Team"
            onChangeHandler={formik.handleChange}
            error={Boolean(formik.errors.teamName)}
            errorMessage={formik.errors.teamName}
          />
          <div className="flex items-center gap-4">
            <FormInput
              labelName="username"
              name="username"
              value={formik.values.username}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.username)}
              errorMessage={formik.errors.username}
            />
            {!loading ? (
              <FixedButton
                name="Add"
                isDisabled={formik.isSubmitting}
                onClickHandler={addgamer}
              />
            ) : (
              <LoadingLottie height={40} width={80} />
            )}
          </div>
          <SelectDropDown
            label="IGL (In Game Lead)"
            handleChange={(item) => {
              formik.setFieldValue('inGameLead', item);
            }}
            name="inGameLead"
            menuItems={gamers}
          />
        </form>
        <div className="flex flex-col mt-10 md:ml-10">
          {gamers.map((gamer, index) => (
            <div
              key={index}
              className="flex justify-between py-2.5 border-b-2 border-gray-800"
            >
              <div className="flex items-stretch justify-between">
                <h6 className="text-lg">
                  {index + 1}. {gamer}
                </h6>
                {gamer === formik.values.inGameLead ? (
                  <div className="bg-red-400 rounded-md px-2 ml-2">
                    <span className="text-sm text-black font-bold">IGL</span>
                  </div>
                ) : null}
              </div>
              <span
                className=""
                onClick={() => {
                  removegamer(gamer);
                }}
              >
                Remove
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-evenly pt-8">
        <FixedButton
          name="Cancel"
          isDisabled={formik.isSubmitting}
          onClickHandler={onCancel}
        />
        <FixedButton
          type="submit"
          name="Save"
          isDisabled={formik.isSubmitting}
          onClickHandler={formik.handleSubmit}
        />
      </div>
      <SnackbarAlert
        open={snackbarData.open}
        onClose={handleClose}
        autoHideDuration={5000}
        message={snackbarData.message}
        type={snackbarData.severity}
      />
    </div>
  );
}
