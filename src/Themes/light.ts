import { lighten, transparentize } from 'polished';

const black = lighten(0.8, '#000');

export default {
  black: black,
  green: '#00875A',
  grey: transparentize(0.1, lighten(0.1, black)),
  name: 'light',
  red: '#D93B30',
  white: '#000',
  yellow: '#FFB266'
};
