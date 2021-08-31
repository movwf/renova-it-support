/* eslint-disable import/prefer-default-export */
import { TIMESTAMP_YEAR_DIFF } from '../settings';

/*
  UTILS
*/

export const isDateValid = (date: any, mode: string) => {
  if (mode === 'min') return +date > +new Date('12/31/1899'); // Must not be born before 1900
  if (mode === 'max') return +date < +new Date(Date.now()) - 18 * TIMESTAMP_YEAR_DIFF; // Must be over 18 years old

  return date;
};
