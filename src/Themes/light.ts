import { lighten, transparentize } from 'polished';

const black = lighten(0.8, '#000');

export default {
  black: black,
  grey1: transparentize(0.1, lighten(0.1, black)),
  grey2: transparentize(0.1, lighten(0.2, black)),
  grey3: transparentize(0.1, lighten(0.3, black)),
  grey4: transparentize(0.1, lighten(0.4, black)),
  grey5: transparentize(0.1, lighten(0.5, black)),
  name: 'light',
  white: '#000'
};
