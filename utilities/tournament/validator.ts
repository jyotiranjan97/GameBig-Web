import * as yup from 'yup';

export const validationSchema = yup.object({
  game: yup.string(),
  mode: yup.string(),
  type: yup.string(),
  tier: yup.string(),
  noOfSlots: yup.number(),
  startTime: yup.date(),
  description: yup
    .string()
    .required('Write a small description about this match'),
  prize: yup.string(),
});