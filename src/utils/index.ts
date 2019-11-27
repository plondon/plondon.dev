import { curry } from 'ramda';
import { lighten } from 'polished';

export const fadeElements = curry(
  (MAX: number, props: { n: number; theme: { black: string } }) =>
    lighten((MAX - props.n + 1) / MAX, props.theme.black)
);
