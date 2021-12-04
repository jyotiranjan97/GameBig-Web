import { useState } from 'react';
import router from 'next/router';
import { useFormik } from 'formik';
import TimeDatePicker from '@/components/UI/Picker/TimeDatePicker';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { GAMES } from '../../../assets/data/Games';
import SelectDropDown from '@/components/UI/Select/SelectDropDown';
import SelectRadioButton from '@/components/UI/Select/SelectRadioButton';
import SliderSelect from '@/components/UI/Slider/SliderSelect';
import { HostEventForm } from '@/utilities/HostEventForm';
import { addNewEvent } from '@/libs/createEvent';
import { useAuth } from '@/context/authContext';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import FormInput from '@/components/UI/Inputs/FormInput';
import TextArea from '@/components/UI/Inputs/TextArea';
import { validationSchema } from '@/utilities/eventItem/validator';
import { EventFormData } from '@/utilities/eventItem/types';

const INITIAL_STATE = {
  gameCode: 'bgmi-m',
  mode: 'Squad',
  type: 'Custom Room',
  tier: 'T1',
  noOfSlots: 10,
  startTime: new Date(),
  description: '',
  prize: '',
};

export default function CreateEventForm() {
  const {
    userData: { linkedPageId, linkedPageName },
  } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: validationSchema,
    onSubmit: async (value, { resetForm }) => {
      setIsModalOpen(true);
      if (linkedPageId && linkedPageName) {
        const tournId = await addNewEvent(linkedPageId, linkedPageName, value);
        if (tournId) {
          router.push(`/page/${linkedPageId}/events`);
        } else {
          router.push('/404');
        }
      }
      setIsModalOpen(false);
      resetForm();
    },
  });

  const formInputComponents = HostEventForm[formik.values.gameCode].form.map(
    (input: Record<string, any>, index: number) => {
      switch (input.formType) {
        case 'radio':
          return (
            <section key={index.toString()}>
              <SelectRadioButton
                label={input.labelName}
                items={input.options}
                values={formik.values}
                name={input.name}
                handleChange={(item) => formik.setFieldValue(input.name, item)}
              />
            </section>
          );
        case 'slider':
          return (
            <section key={index.toString()}>
              <SliderSelect
                label={input.labelName}
                name={input.name}
                values={formik.values}
                min={input.min}
                max={formik.values.mode === 'Solo' ? input.max * 4 : input.max}
                onSlide={(e) =>
                  formik.setFieldValue(input.name, e.target.value)
                }
              />
            </section>
          );
        default:
          return <></>;
      }
    }
  );

  return (
    <Aux>
      <div
        className={
          'md:w-5/6 lg:w-2/3 mx-auto mt-6 ' +
          'relative flex flex-col mb-6 ' +
          'shadow-lg rounded-lg border-0'
        }
      >
        <div
          className={
            'rounded-t-lg bg-gradient-to-tl from-gray-900 to-black ' +
            'mb-0 md:px-7 px-4 py-6 text-center flex justify-between'
          }
        >
          <h6 className="text-white text-2xl font-semibold mt-5 opacity-60">
            Create Custom Room
          </h6>
          <FixedButton
            name="Cancel"
            isDangerous={true}
            onClick={() => router.back()}
          />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gradient-to-tr from-black to-gray-900">
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="false">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <SelectDropDown
                label="Game Name"
                handleChange={(item) => {
                  formik.setFieldValue('gameCode', item.id);
                }}
                menuItems={GAMES}
                propToShow="name"
              />
              <TimeDatePicker
                name="startTime"
                error={false}
                label="Date and Time"
                changeHandler={(date: Date) => {
                  formik.setFieldValue('startTime', date);
                }}
              />
              {formInputComponents}
              <FormInput
                labelName="Prize / Reward (Optional)"
                name="prize"
                placeHolder="100 rupees"
                value={formik.values.prize}
                onChangeHandler={formik.handleChange}
                error={Boolean(formik.errors.prize)}
                errorMessage={formik.errors.prize}
              />
            </div>
            <TextArea
              name="description"
              labelName="Rules for Matches"
              placeHolder="Describe your Rules and Point distribution here"
              value={formik.values.description}
              onChangeHandler={formik.handleChange}
            />
            <ResponsiveButton name="Save" onClick={formik.handleSubmit} />
          </form>
        </div>
      </div>
    </Aux>
  );
}

// todo: show error for textarea for description
