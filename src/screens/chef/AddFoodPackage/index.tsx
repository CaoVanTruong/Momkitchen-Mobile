import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Text } from '@rneui/themed';
import { ChevronDown, ChevronUp } from 'assets/svgs';
import { ScreenContainer } from 'components';
import Colors from 'constants/colors';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getDishes, getFoodStyles } from 'redux/actions/market';
import { foodPackageSchemas } from 'schemas';
import { AddFoodPackageFormType } from 'schemas/foodPackageSchemas';
import { RootState } from 'store';
import { IFoodStyle } from 'types/foodStyle';
import AddListFood from './AddListFood';
import { ScrollView } from 'react-native-gesture-handler';
import {
  addFoodPackage,
  getFoodPackages,
  updateFoodPackage,
} from 'redux/actions/foodPackage';
import { useNavigation, useRoute } from '@react-navigation/native';
import Dimension from 'constants/dimension';
import { IFoodPackage } from 'types/foodPackage';
import UploadImage from './UploadImage';

const AddFoodPackageScreen = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();
  const router = useRoute();

  const { foodStyles, dishes, isLoading } = useSelector(
    (state: RootState) => state.market,
  );

  const { isLoading: isSubmitLoading, items: foodPackagesList } = useSelector(
    (state: RootState) => state.foodPackage,
  );

  const routerParams = router.params as any;
  const foodPackageId = routerParams?.foodPackageId as number | undefined;

  const curFoodPackage = foodPackagesList.find(fp => fp.id === foodPackageId);
  const isUpdateDisabled =
    curFoodPackage && !!curFoodPackage.sessionPackages[0]?.sessionId;

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

  const getFoodPackageDishes = (fp: IFoodPackage) => {
    if (!fp || !fp.dishFoodPackages || !fp.dishFoodPackages.length) {
      return [];
    }

    const curDishes = fp.dishFoodPackages;
    const dishesState = curDishes.map(dish => {
      const dishName = dishes.find(d => dish.dishId === d.id)?.name;
      return {
        ...dish,
        title: dishName,
      };
    });
    return dishesState;
  };

  const { control, handleSubmit } = useForm<AddFoodPackageFormType>({
    resolver: yupResolver(foodPackageSchemas.addFoodPackageSchema),
    defaultValues: curFoodPackage
      ? {
          name: curFoodPackage.name,
          defaultPrice: curFoodPackage.defaultPrice,
          description: curFoodPackage.description,
          foodPackageStyleId: curFoodPackage.foodPackageStyle?.id,
          image: curFoodPackage.image
            ? { fileName: undefined, uri: curFoodPackage.image }
            : undefined,
          dishes: getFoodPackageDishes(curFoodPackage),
        }
      : {
          name: '',
          description: '',
          defaultPrice: 0,
          dishes: [],
        },
  });

  const dropdownRef = useRef<SelectDropdown>(null);

  const onSubmit = (values: AddFoodPackageFormType) => {
    if (curFoodPackage) {
      dispatch(
        updateFoodPackage({
          foodPackageId: curFoodPackage.id,
          foodPackage: values,
        }),
      )
        .unwrap()
        .then(() => {
          navigation.goBack();
          dispatch(getFoodPackages());
        })
        .catch((err: any) => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
      return;
    }

    dispatch(addFoodPackage(values))
      .unwrap()
      .then(() => {
        navigation.goBack();
        dispatch(getFoodPackages());
      })
      .catch((err: any) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  return (
    <ScreenContainer
      title={foodPackageId ? 'Edit Food Package' : 'Add Food Package'}
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
              disabled={isUpdateDisabled}
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
              disabled={isUpdateDisabled}
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
              disabled={isUpdateDisabled}
            />
          )}
        />
        <Controller
          control={control}
          name="foodPackageStyleId"
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={styles.dropdownLabel}>Food Style</Text>
              {isUpdateDisabled ? (
                <Text style={styles.valueText}>
                  {curFoodPackage.foodPackageStyle?.title}
                </Text>
              ) : (
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
              )}
            </View>
          )}
        />
        <UploadImage control={control} disabled={isUpdateDisabled} />
        <AddListFood
          control={control}
          dishesList={dishes}
          disabled={isUpdateDisabled}
        />
      </ScrollView>
      {!isUpdateDisabled && (
        <Button
          title={'Save'}
          buttonStyle={styles.submitBtn}
          titleStyle={styles.buttonTitle}
          onPress={handleSubmit(onSubmit)}
          disabled={curFoodPackage && curFoodPackage.sessionPackages.length > 0}
        />
      )}
    </ScreenContainer>
  );
};

export default AddFoodPackageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 16,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
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
  valueText: {
    marginLeft: 12,
    fontWeight: 'bold',
  },
});
