import * as yup from 'yup';

const addDishTypeSchema = yup.object({
  name: yup.string().required('Please enter a dish type name'),
  description: yup.string(),
});

const addDishSchema = yup.object({
  name: yup.string().required('Please enter a dish name'),
  dishTypeId: yup.number(),
});

const addFoodStyleSchema = yup.object({
  title: yup.string().required('Please enter a food style name'),
});

export default { addDishTypeSchema, addDishSchema, addFoodStyleSchema };
export type AddDishTypeFormType = yup.InferType<typeof addDishTypeSchema>;
export type AddDishFormType = yup.InferType<typeof addDishSchema>;
export type AddFoodStyleFormType = yup.InferType<typeof addFoodStyleSchema>;
