import * as yup from 'yup';

const addFoodPackageSchema = yup.object({
  name: yup.string().required('Please enter a dish type name'),
  description: yup.string(),
  defaultPrice: yup
    .number()
    .required('Please enter a default price')
    .min(1, 'Price must be greater than zero'),
  foodPackageStyleId: yup.number(),
  dishes: yup.array().of(
    yup.object({
      dishId: yup.number(),
      title: yup.string(),
      quantity: yup.number(),
    }),
  ),
  image: yup.object({
    fileName: yup.string(),
    uri: yup.string(),
  }),
});

export default { addFoodPackageSchema };

export type AddFoodPackageFormType = yup.InferType<typeof addFoodPackageSchema>;
