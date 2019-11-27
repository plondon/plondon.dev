import { curry } from 'ramda';
import { darken, lighten } from 'polished';

export const fadeElements = curry(
  (
    MAX: number,
    props: { n: number; theme: { black: string; name: string } }
  ) => {
    const fadeFunc = props.theme.name === 'light' ? darken : lighten;
    return fadeFunc((MAX - props.n + 1) / MAX, props.theme.black);
  }
);
