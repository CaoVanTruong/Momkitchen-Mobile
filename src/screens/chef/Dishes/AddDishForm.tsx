import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Text } from '@rneui/themed';
import { ChevronDown, ChevronUp } from 'assets/svgs';
import { Modal } from 'components';
import Colors from 'constants/colors';
import React from 'react';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { dishSchemas } from 'schemas';
import { AddDishFormType } from 'schemas/dishSchemas';
import { IDishType } from 'types/dish';
import UploadImage from './UploadImage';

interface AddDishFormProps {
  visible: boolean;
  dishTypes: IDishType[];
  onClose?: () => void;
  onSubmit?: (value: AddDishFormType) => void;
}

const AddDishForm = ({
  visible = true,
  dishTypes,
  onClose,
  onSubmit = () => {},
}: AddDishFormProps) => {
  const dropdownRef = useRef<SelectDropdown | null>(null);

  const { control, handleSubmit, reset } = useForm<AddDishFormType>({
    resolver: yupResolver(dishSchemas.addDishSchema),
  });

  const onSubmitForm = (value: AddDishFormType) => {
    onSubmit(value);
    reset();
    dropdownRef.current?.reset();
  };

  return (
    <Modal
      isVisible={visible}
      title="Add new Dish"
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
        name="dishTypeId"
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.dropdownLabel}>Dish Type</Text>
            <SelectDropdown
              data={dishTypes}
              ref={dropdownRef}
              onSelect={(item: IDishType) => {
                onChange(item.id);
              }}
              defaultValue={value}
              buttonTextAfterSelection={(selectedItem: IDishType) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item: IDishType) => item.name}
              defaultButtonText="Select Food Type"
              buttonStyle={styles.dropdownBtnStyle}
              buttonTextStyle={styles.dropdownBtnTxtStyle}
              renderDropdownIcon={(isOpened: boolean) => {
                return isOpened ? (
                  <ChevronUp width={18} height={18} fill={Colors.black} />
                ) : (
                  <ChevronDown width={18} height={18} fill={Colors.black} />
                );
              }}
              dropdownIconPosition="right"
              rowStyle={styles.dropdownDropdownStyle}
              rowTextStyle={styles.dropdownRowTxtStyle}
            />
          </View>
        )}
      />
      <UploadImage control={control} />
    </Modal>
  );
};

export default AddDishForm;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 8,
    fontSize: 14,
  },
  label: {
    color: Colors.superDarkPink,
    fontSize: 14,
  },
  dropdownLabel: {
    color: Colors.superDarkPink,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 12,
  },
  error: {
    color: Colors.red,
  },
  dropdownBtnStyle: {
    height: 48,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    alignSelf: 'center',
  },
  dropdownBtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdownDropdownStyle: {
    backgroundColor: '#EFEFEF',
  },
  dropdownRowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
});
