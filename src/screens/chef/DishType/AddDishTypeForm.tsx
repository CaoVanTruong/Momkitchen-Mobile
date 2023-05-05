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
}

const AddDishTypeForm = ({ visible = true, onClose }: AddDishTypeFormProps) => {
  const { control, handleSubmit } = useForm<AddDishTypeFormType>({
    resolver: yupResolver(dishSchemas.addDishTypeSchema),
  });

  const onSubmit = (value: AddDishTypeFormType) => {
    console.log(value);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      isVisible={visible}
      title="Add new Dish Type"
      onClose={onClose}
      onCancelPress={onClose}
      onSubmitPress={handleSubmit(onSubmit)}>
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
  },
  label: {
    color: Colors.superDarkPink,
    fontSize: 14,
  },
  error: {
    color: Colors.red,
  },
});
