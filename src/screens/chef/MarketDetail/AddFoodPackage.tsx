import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Text } from '@rneui/themed';
import { ChevronDown, ChevronUp } from 'assets/svgs';
import { Modal } from 'components';
import Colors from 'constants/colors';
import Dimension from 'constants/dimension';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { foodPackageSchemas } from 'schemas';
import { AddFoodPackageToSessionFormType } from 'schemas/foodPackageSchemas';
import { IFoodPackage } from 'types/foodPackage';

interface AddFoodPackageProps {
  visible: boolean;
  foodPackages: IFoodPackage[];
  onClose?: () => void;
  onSubmit?: (value: AddFoodPackageToSessionFormType) => void;
}

const AddFoodPackage = ({
  visible = true,
  foodPackages,
  onClose,
  onSubmit = () => {},
}: AddFoodPackageProps) => {
  const dropdownRef = useRef<SelectDropdown>(null);

  const { control, handleSubmit, reset } =
    useForm<AddFoodPackageToSessionFormType>({
      resolver: yupResolver(foodPackageSchemas.addFoodPackageToSessionSchema),
      defaultValues: {
        price: 0,
        quantity: 0,
      },
    });

  const onSubmitForm = (value: AddFoodPackageToSessionFormType) => {
    onSubmit(value);
    reset();
  };

  return (
    <Modal
      isVisible={visible}
      title="Add Food Package to Session"
      onClose={onClose}
      onCancelPress={onClose}
      onSubmitPress={handleSubmit(onSubmitForm)}>
      <View style={styles.container}>
        <Controller
          control={control}
          name="foodPackageId"
          render={({ field: { onChange, value } }) => (
            <View style={styles.dropdown}>
              <Text style={styles.dropdownLabel}>Food Package</Text>
              <SelectDropdown
                data={foodPackages}
                ref={dropdownRef}
                onSelect={(item: IFoodPackage) => {
                  onChange(item.id);
                }}
                defaultValue={value}
                buttonTextAfterSelection={(selectedItem: IFoodPackage) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item: IFoodPackage) => item.name}
                defaultButtonText="Select Food Package"
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
        <Controller
          control={control}
          name="price"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Food package price"
              label="Price"
              value={value?.toString()}
              onChangeText={text => onChange(Number(text))}
              onBlur={onBlur}
              errorMessage={error?.message}
              errorStyle={styles.error}
              inputStyle={styles.input}
              labelStyle={styles.label}
              rightIcon={<Text>VND</Text>}
            />
          )}
        />
        <Controller
          control={control}
          name="quantity"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Food package quantity"
              label="Quantity"
              value={value?.toString()}
              onChangeText={text => onChange(Number(text))}
              onBlur={onBlur}
              errorMessage={error?.message}
              errorStyle={styles.error}
              inputStyle={styles.input}
              labelStyle={styles.label}
            />
          )}
        />
      </View>
    </Modal>
  );
};

export default AddFoodPackage;

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimension.SCREEN_WIDTH * 0.75,
  },
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
  dropdown: {
    marginBottom: 16,
  },
  dropdownLabel: {
    color: Colors.superDarkPink,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 12,
  },
  dropdownBtnStyle: {
    height: 48,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray,
    alignSelf: 'center',
    width: '90%',
  },
  dropdownBtnTxtStyle: {
    color: Colors.black,
    textAlign: 'left',
    fontSize: 14,
  },
  dropdownDropdownStyle: {
    backgroundColor: Colors.white,
  },
  dropdownRowStyle: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.gray,
  },
  dropdownRowTxtStyle: {
    color: Colors.black,
    textAlign: 'left',
    fontSize: 14,
  },
});
