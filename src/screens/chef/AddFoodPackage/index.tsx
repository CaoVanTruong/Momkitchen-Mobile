import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Text } from '@rneui/themed';
import { ChevronDown, ChevronUp } from 'assets/svgs';
import { ScreenContainer, UploadImage } from 'components';
import Colors from 'constants/colors';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getDishes, getFoodStyles } from 'redux/actions/market';
import { foodPackageSchemas } from 'schemas';
import { AddFoodPackageFormType } from 'schemas/foodPackageSchemas';
import { RootState } from 'store';
import { IFoodStyle } from 'types/foodStyle';
import AddListFood from './AddListFood';
import { ScrollView } from 'react-native-gesture-handler';
import { addFoodPackage, getFoodPackages } from 'redux/actions/foodPackage';
import { useNavigation } from '@react-navigation/native';
import Dimension from 'constants/dimension';

const AddFoodPackageScreen = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();

  const { foodStyles, dishes, isLoading } = useSelector(
    (state: RootState) => state.market,
  );

  const { isLoading: isSubmitLoading } = useSelector(
    (state: RootState) => state.foodPackage,
  );

  const fetchFoodStyles = () => {
    dispatch(getFoodStyles());
  };

  const fetchDishes = () => {
    dispatch(getDishes());
  };

  useEffect(() => {
    fetchFoodStyles();
    fetchDishes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control, handleSubmit } = useForm<AddFoodPackageFormType>({
    resolver: yupResolver(foodPackageSchemas.addFoodPackageSchema),
    defaultValues: {
      name: '',
      description: '',
      defaultPrice: 0,
      dishes: [],
    },
  });

  const dropdownRef = useRef<SelectDropdown>(null);

  const onSubmit = (values: AddFoodPackageFormType) => {
    dispatch(addFoodPackage(values))
      .unwrap()
      .then(() => {
        navigation.goBack();
        dispatch(getFoodPackages());
      });
  };

  return (
    <ScreenContainer
      title="Add Food Package"
      isLoading={isLoading || isSubmitLoading}
      bodyContainerStyle={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Controller
          control={control}
          name="name"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Food Package Name"
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
              placeholder="Food Package Description"
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
        <Controller
          control={control}
          name="defaultPrice"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Food Package Price"
              label="Price"
              value={value.toString()}
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
          name="foodPackageStyleId"
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={styles.dropdownLabel}>Food Style</Text>
              <SelectDropdown
                data={foodStyles}
                ref={dropdownRef}
                onSelect={(item: IFoodStyle) => {
                  onChange(item.id);
                }}
                defaultValue={value}
                buttonTextAfterSelection={(selectedItem: IFoodStyle) => {
                  return selectedItem.title;
                }}
                rowTextForSelection={(item: IFoodStyle) => item.title}
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
        <AddListFood control={control} dishesList={dishes} />
      </ScrollView>
      <Button
        title={'Save'}
        buttonStyle={styles.submitBtn}
        titleStyle={styles.buttonTitle}
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenContainer>
  );
};

export default AddFoodPackageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 16,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
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
  submitBtn: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: Dimension.RADIUS_2,
    backgroundColor: Colors.darkGreen,
    marginHorizontal: 24,
  },
  buttonTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
