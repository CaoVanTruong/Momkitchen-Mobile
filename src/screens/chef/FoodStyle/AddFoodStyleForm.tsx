import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@rneui/themed';
import { Modal } from 'components';
import Colors from 'constants/colors';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { dishSchemas } from 'schemas';
import { AddFoodStyleFormType } from 'schemas/dishSchemas';

interface AddFoodStyleFormProps {
  visible: boolean;
  onClose?: () => void;
  onSubmit?: (value: AddFoodStyleFormType) => void;
}

const AddFoodStyleForm = ({
  visible = true,
  onClose,
  onSubmit = () => {},
}: AddFoodStyleFormProps) => {
  const { control, handleSubmit, reset } = useForm<AddFoodStyleFormType>({
    resolver: yupResolver(dishSchemas.addFoodStyleSchema),
  });

  const onSubmitForm = (value: AddFoodStyleFormType) => {
    onSubmit(value);
    reset();
  };

  return (
    <Modal
      isVisible={visible}
      title="Add new Food Style"
      onClose={onClose}
      onCancelPress={onClose}
      onSubmitPress={handleSubmit(onSubmitForm)}>
      <Controller
        control={control}
        name="title"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            placeholder="Food Style Title"
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
    </Modal>
  );
};

export default AddFoodStyleForm;

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
