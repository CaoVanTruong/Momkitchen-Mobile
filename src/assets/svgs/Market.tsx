import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 35.25 31.33" {...props}>
    <Path
      fill={props.fill || '#FF7A00'}
      fillOpacity={0.7}
      d="M2.833 4.75V.833h31.334V4.75H2.833Zm0 27.417v-11.75H.875V16.5l1.958-9.792h31.334l1.958 9.792v3.917h-1.958v11.75H30.25v-11.75h-7.833v11.75H2.833ZM6.75 28.25H18.5v-7.833H6.75v7.833Z"
    />
  </Svg>
);
export default SvgComponent;
