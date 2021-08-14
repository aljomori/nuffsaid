import merge from 'lodash/merge';
import { Components } from '@material-ui/core/styles/components';
import { Theme } from '@emotion/react';
import Button from './Button';

export default function ComponentsOverrides(theme: Theme): Components {
  return merge(Button(theme));
}
