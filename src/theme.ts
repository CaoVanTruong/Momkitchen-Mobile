import { createTheme } from '@rneui/themed';

const theme = createTheme({
  components: {
    Text: {
      h1Style: {
        fontSize: 40,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      h2Style: {
        fontSize: 32,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      h3Style: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
    },
  },
});

export default theme;
