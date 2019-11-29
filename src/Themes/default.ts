import { lighten, transparentize } from 'polished';

const black = lighten(0.07, '#000');

export default {
  black: black,
  green: '#00875A',
  grey: transparentize(0.1, lighten(0.1, black)),
  name: 'default',
  red: '#D93B30',
  white: '#fff',
  yellow: '#FFB266'
};
