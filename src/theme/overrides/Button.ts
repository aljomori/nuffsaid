import { Components } from '@material-ui/core/styles/components';
import { Theme } from '@emotion/react';

export default function Button(theme: Theme): Components {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'black',
          fontWeight: 'bold',
          backgroundColor: theme.colors.info,
        },
      },
    },
  };
}
