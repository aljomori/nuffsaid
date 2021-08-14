import { createTheme } from '@material-ui/core/styles';
import { Theme } from '@emotion/react';
import componentsOverride from './overrides';

const baseTheme = createTheme();
const newCustomTheme: Theme = {
  ...baseTheme,
  colors: {
    info: '#88FCA3',
    warning: '#FCE788',
    error: '#F56236',
  },
};
baseTheme.components = componentsOverride(newCustomTheme);

const index = {
  ...newCustomTheme,
  ...baseTheme,
};

export default index;
