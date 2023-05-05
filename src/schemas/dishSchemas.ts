import * as yup from 'yup';

const addDishTypeSchema = yup.object({
  name: yup.string().required('Please enter an dish type name'),
  description: yup.string(),
});

export default { addDishTypeSchema };
export type AddDishTypeFormType = yup.InferType<typeof addDishTypeSchema>;
