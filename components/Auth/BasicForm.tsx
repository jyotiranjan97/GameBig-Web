import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../context/authContext';
import { UserData } from '../../utilities/types';
import FormInput from '../UI/Inputs/FormInput';
import FixedButton from '../UI/Buttons/FixedButton';
import { useUI } from '@/context/uiContext';

const usernameRegExp = /^[a-zA-Z0-9-_]{0,40}$/;

const validationSchema = yup.object({
  username: yup
    .string()
    .matches(usernameRegExp, 'username can contain only letters and numbers')
    .required('username is required'),
});

type Props = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
};

function BasicForm({ userData, setUserData }: Props) {
  const { updateAuthPageNumber, saveUser, isUsernameTaken } = useAuth();
  const { openSnackBar } = useUI();

  const formik = useFormik({
    initialValues: userData,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      const isTaken = await isUsernameTaken(values.username);
      if (isTaken) {
        setErrors({ username: 'This username is taken!' });
        openSnackBar({
          label: 'Taken!',
          message: 'username is taken',
          type: 'warning',
        });
      } else {
        setUserData(values);
        saveUser(values);
        updateAuthPageNumber(3);
      }
      setSubmitting(false);
    },
  });

  return (
    <div
      className={
        'flex flex-col mb-10 px-10 md:px-32  md:w-3/5 pt-20 font-san font-semibold ' +
        'rounded-lg bg-gradient-to-tl from-gray-900 via-black to-gray-900'
      }
    >
      <form className="flex justify-center ">
        <FormInput
          labelName="username"
          name="username"
          value={formik.values.username}
          onChangeHandler={formik.handleChange}
          error={Boolean(formik.errors.username)}
          errorMessage={formik.errors.username}
        />
      </form>
      <div className="flex justify-center">
        <FixedButton onClick={formik.handleSubmit} name="Continue" />
      </div>
    </div>
  );
}

export default BasicForm;
