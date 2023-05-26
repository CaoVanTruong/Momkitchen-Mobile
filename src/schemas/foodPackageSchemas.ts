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

const addFoodPackageToSessionSchema = yup.object({
  foodPackageId: yup.number().required('Food package can not be null'),
  price: yup
    .number()
    .required('Please enter a food package price')
    .min(1, 'Price must be greater than zero'),
  quantity: yup
    .number()
    .required('Please enter food package quantity')
    .min(1, 'Quantity must be greater than zero'),
});

export default { addFoodPackageSchema, addFoodPackageToSessionSchema };

export type AddFoodPackageFormType = yup.InferType<typeof addFoodPackageSchema>;
export type AddFoodPackageToSessionFormType = yup.InferType<
  typeof addFoodPackageToSessionSchema
>;
