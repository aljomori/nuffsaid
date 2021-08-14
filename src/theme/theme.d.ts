import '@emotion/react';
import { Theme as MuiTheme } from '@material-ui/core';

interface IThemeColors {
  info: string;
  warning: string;
  error: string;
}

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    colors: IThemeColors;
  }
}
