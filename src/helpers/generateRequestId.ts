/* eslint-disable no-continue */
/**
 * This function generates random request id
 * like an api giving it after submitting the
 * request form data.
 *  E.g: 1234-5678-01
 * @returns Random request ID
 */
const generateRequestId = () => {
  let requestId = '';
  const storeId = '01';

  for (let i = 0; i < 10; i += 1) {
    if ([4, 9].includes(i)) {
      requestId += '-';
      continue;
    }
    requestId += Math.floor(Math.random() * 9);
  }

  return { id: requestId + storeId, store: storeId };
};

export default generateRequestId;
