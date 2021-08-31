import '@testing-library/jest-dom';
import { REQUEST_ID_REGEX } from '../configs/settings';

import generateRequestId from './generateRequestId';

describe('Func: generateRequestId', () => {
  test('should generate random request id', () => {
    const requestId = generateRequestId();

    expect(requestId.id).toMatch(REQUEST_ID_REGEX);
  });

  test('should generate random values', () => {
    const initialGeneratedValue = generateRequestId();
    const secondGeneratedVale = generateRequestId();

    expect(secondGeneratedVale.id).not.toEqual(initialGeneratedValue.id);
  });
});
