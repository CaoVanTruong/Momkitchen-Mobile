import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={props.fill}
      strokeLinecap="round"
      strokeWidth={2}
      d="m16 8-8 8m0-8 8 8"
    />
  </Svg>
);
export default SvgComponent;
