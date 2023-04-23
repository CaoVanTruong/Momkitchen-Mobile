import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 47 47" {...props}>
    <Path
      fill="#FF7A00"
      d="M8.658 21.15 22.263 0l13.605 21.15H8.658ZM35.868 47c-3.092 0-5.72-1.029-7.886-3.086-2.165-2.057-3.247-4.553-3.245-7.489 0-2.938 1.083-5.435 3.248-7.492 2.165-2.057 4.793-3.085 7.883-3.083 3.093 0 5.721 1.028 7.886 3.085 2.166 2.058 3.248 4.554 3.246 7.49 0 2.938-1.083 5.435-3.248 7.492-2.165 2.057-4.793 3.085-7.884 3.083ZM0 45.825v-18.8h19.79v18.8H0Z"
    />
  </Svg>
);
export default SvgComponent;
