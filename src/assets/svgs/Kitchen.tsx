import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 39.17 31.33" {...props}>
    <Path
      fill={props.fill || '#FF7A00'}
      fillOpacity={0.7}
      d="M32.25 12.583V6.708A5.867 5.867 0 0 0 26.375.833 5.867 5.867 0 0 0 20.5 6.708h3.917c0-1.077.88-1.958 1.958-1.958 1.077 0 1.958.881 1.958 1.958v5.875H12.667a3.928 3.928 0 0 0 3.916-3.916V.833H4.833v7.834a3.928 3.928 0 0 0 3.917 3.916H.917V16.5h3.916v15.667h31.334V16.5h3.916v-3.917H32.25ZM22.458 28.25h-3.916V16.5h3.916v11.75Z"
    />
  </Svg>
);
export default SvgComponent;
