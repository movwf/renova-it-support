import * as yup from 'yup';
import { capitalize } from 'lodash';

interface ILocale {
  path: string;
  min?: number;
  max?: number;
}

yup.setLocale({
  string: {
    min: ({ path, min }: ILocale) => `${capitalize(path)} must be at least ${min} character.`,
    max: ({ path, max }: ILocale) => `${capitalize(path)} must be at least ${max} character.`,
  },
  date: {
    min: ({ path, min }: any) => `${capitalize(path)} must be after than ${min}.`,
    max: ({ path, max }: any) => `${capitalize(path)} must be before than ${max}.`,
  },
});

export default yup;
