import { ILoginStateMessages } from '../types/pages/Login.types';

export const APP_PORTAL_NODE = 'portal-node';

/*

  VALIDATION CONFIGS

*/

export const MAX_FILE_SIZE = 500 * 1024; // 500 KB
export const TIMESTAMP_YEAR_DIFF = 31_555_000_000;
export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
export const REQUEST_ID_REGEX = /([0-9]{4}-){2}[0-9]{2}/;
export const REQUEST_ID_VALIDATE_MESSAGE = 'Not a valid request ID. Eg. 1234-5678-01';

/*

DATA CONFIGURATIONS

*/

// =====> RequestTable

export const StatusStates = {
  repaired: 'Repaired',
  refurbished: 'Refurbished',
  inRepair: 'In Repair',
  inTransit: 'In Transit',
  inRequest: 'In Request',
};

export const StatusColors = {
  repaired: 'green',
  refurbished: '#dbac00',
  inRepair: '#0F62FE',
  inTransit: 'rebeccapurple',
  inRequest: 'indianred',
};

/*

  STRING CONFIGS

*/

export const loginStateMessages: ILoginStateMessages = {
  success: 'Successfully logged in!',
  error: 'Login credentials are not correct.',
};
