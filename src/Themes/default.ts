import { lighten, transparentize } from 'polished';

const background = '#000';

export default {
  black: lighten(0.05, background),
  grey1: transparentize(0.1, lighten(0.1, background)),
  grey2: transparentize(0.1, lighten(0.2, background)),
  grey3: transparentize(0.1, lighten(0.3, background)),
  grey4: transparentize(0.1, lighten(0.4, background)),
  grey5: transparentize(0.1, lighten(0.5, background)),
  white: '#fff'
};
