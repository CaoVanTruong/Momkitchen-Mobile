import { Dimensions } from 'react-native';

const WIDTH_CONSTRANT = 414;
const HEIGHT_CONSTRANT = 768;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const responsiveWidth = (width: number) =>
  (SCREEN_WIDTH / WIDTH_CONSTRANT) * width;

const responsiveHeight = (height: number) =>
  (SCREEN_HEIGHT / HEIGHT_CONSTRANT) * height;

const RADIUS_1 = 4;
const RADIUS_2 = 8;
const RADIUS_3 = 12;
const RADIUS_4 = 24;

export default {
  responsiveHeight,
  responsiveWidth,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  RADIUS_1,
  RADIUS_2,
  RADIUS_3,
  RADIUS_4,
};
