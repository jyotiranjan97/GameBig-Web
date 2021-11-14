import { useFormik } from 'formik';
import * as yup from 'yup';
import FormInput from '@/components/UI/Inputs/FormInput';
import SelectDropDown from '@/components/UI/Select/SelectDropDown';
import { TeamType } from '@/utilities/types';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import { db } from 'firebase/firebaseClient';

interface Props {
  participants: TeamType[];
  eventId: string;
}

const INITIAL_STATE = {
  firstWinner: {},
  secondWinner: {},
  thirdWinner: {},
  firstPrize: '',
  secondPrize: '',
  thirdPrize: '',
};

// export const validationSchema = yup.object({
//    firstWinner: yup.BaseSchema(),
//   secondWinner: {},
//   thirdWinner: {},
//   firstPrize: '',
//   secondPrize: '',
//   thirdPrize: '',
// });

const EventResultForm = ({ participants, eventId }: Props) => {
  const saveResults = async (val: any) => {
    await db
      .collection('events')
      .doc(eventId)
      .collection('results')
      .doc('results')
      .set(val);
  };
  const formik = useFormik({
    initialValues: INITIAL_STATE,
    // validationSchema: validationSchema,
    onSubmit: async (value, { resetForm }) => {
      saveResults(value);
      resetForm();
    },
  });
  return (
    <div className="w-1/2">
      <form onSubmit={formik.handleSubmit} noValidate autoComplete="false">
        <div>
          <SelectDropDown
            name="firstWinner"
            label="First"
            menuItems={participants}
            propToShow="teamName"
            handleChange={(item) => {
              formik.setFieldValue('firstWinner', item);
            }}
          />
          <FormInput
            name="firstPrize"
            labelName="Prize"
            onChangeHandler={formik.handleChange}
            value={formik.values.firstPrize}
          />
        </div>
        <div>
          <SelectDropDown
            name="secondWinner"
            label="Second"
            propToShow="teamName"
            menuItems={participants}
            handleChange={(item) => {
              formik.setFieldValue('secondWinner', item);
            }}
          />
          <FormInput
            name="secondPrize"
            labelName="Prize"
            onChangeHandler={formik.handleChange}
            value={formik.values.secondPrize}
          />
        </div>
        <div>
          <SelectDropDown
            name="thirdWinner"
            label="Third"
            propToShow="teamName"
            menuItems={participants}
            handleChange={(item) => {
              formik.setFieldValue('thirdWinner', item);
            }}
          />
          <FormInput
            name="thirdPrize"
            labelName="Prize"
            onChangeHandler={formik.handleChange}
            value={formik.values.thirdPrize}
          />
        </div>
        <FixedButton name="Update Winners" type="submit" />
      </form>
    </div>
  );
};

export default EventResultForm;
