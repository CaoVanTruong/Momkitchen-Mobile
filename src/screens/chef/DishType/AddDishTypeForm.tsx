import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@rneui/themed';
import { Modal } from 'components';
import { Colors } from 'constants';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { dishSchemas } from 'schemas';
import { AddDishTypeFormType } from 'schemas/dishSchemas';

interface AddDishTypeFormProps {
  visible: boolean;
  onClose?: () => void;
  onSubmit?: (value: AddDishTypeFormType) => void;
}

const AddDishTypeForm = ({
  visible = true,
  onClose,
  onSubmit = () => {},
}: AddDishTypeFormProps) => {
  const { control, handleSubmit, reset } = useForm<AddDishTypeFormType>({
    resolver: yupResolver(dishSchemas.addDishTypeSchema),
  });

  const onSubmitForm = (value: AddDishTypeFormType) => {
    console.log(value);
    onSubmit(value);
    reset();
  };

  return (
    <Modal
      isVisible={visible}
      title="Add new Dish Type"
      onClose={onClose}
      onCancelPress={onClose}
      onSubmitPress={handleSubmit(onSubmitForm)}>
      <Controller
        control={control}
        name="name"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            placeholder="Dish Type Name"
            label="Name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={error?.message}
            errorStyle={styles.error}
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            placeholder="Dish Type Description"
            label="Description"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={error?.message}
            errorStyle={styles.error}
            inputStyle={styles.input}
            labelStyle={styles.label}
          />
        )}
      />
    </Modal>
  );
};

export default AddDishTypeForm;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 8,
    fontSize: 14,
  },
  label: {
    color: Colors.superDarkPink,
    fontSize: 14,
  },
  error: {
    color: Colors.red,
  },
});
