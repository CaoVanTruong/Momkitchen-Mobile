import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill="none"
      stroke={props.fill || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m5 16 7-7 7 7"
    />
  </Svg>
);
export default SvgComponent;
