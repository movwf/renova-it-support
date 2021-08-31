import '@testing-library/jest-dom';
import serializeFormData, { getArrayString } from './serializeFormData';

const simpleFormData = {
  serialNumber: '1234567890ABCDEF',
  product: 'notebook',
  agree: {
    tos: true,
  },
  address: 'Test Str.',
  birthdate: '1998-12-31T22:00:00.000Z',
  nationalityId: '12345678901',
  email: 'a@a.com',
  name: 'Function Test',
  problem: "My computer doesn't work. ",
  images: ['https://res.cloudinary.com/kt-sec/image/upload/v1630164561/jcm2nxcr1tggncyzppzj.png'],
};

describe('Func: serializeFormData', () => {
  test('should serialize simple form data', () => {
    // Unrandomize random generated parts for comparison
    const unRandomizeResult = (data: any) =>
      Object.assign(data, { request_id: null, store_id: null });

    const serializedData = serializeFormData(simpleFormData);

    const serializedSimpleFormData = {
      // @ts-ignore
      request_id: null,
      // @ts-ignore
      store_id: null,
      product_id: simpleFormData.product,
      serial_number: simpleFormData.serialNumber,
      name: simpleFormData.name,
      customer_email: simpleFormData.email,
      nationality_number: simpleFormData.nationalityId,
      birthdate: simpleFormData.birthdate,
      address: simpleFormData.address,
      problem: simpleFormData.problem,
      image_urls: simpleFormData.images ? getArrayString(simpleFormData.images) : '{}',
      agree_privacy: true,
      agree_tos: true,
      status: 'inRequest',
    };

    expect(serializedSimpleFormData).toEqual(unRandomizeResult(serializedData));
  });

  test('should serialize simple form data (without image upload)', () => {
    // Unrandomize random generated parts for comparison
    const unRandomizeResult = (data: any) =>
      Object.assign(data, { request_id: null, store_id: null });

    // @ts-ignore
    delete simpleFormData.images;

    const serializedData = serializeFormData(simpleFormData);

    const serializedSimpleFormData = {
      // @ts-ignore
      request_id: null,
      // @ts-ignore
      store_id: null,
      product_id: simpleFormData.product,
      serial_number: simpleFormData.serialNumber,
      name: simpleFormData.name,
      customer_email: simpleFormData.email,
      nationality_number: simpleFormData.nationalityId,
      birthdate: simpleFormData.birthdate,
      address: simpleFormData.address,
      problem: simpleFormData.problem,
      image_urls: '{}',
      agree_privacy: true,
      agree_tos: true,
      status: 'inRequest',
    };

    expect(serializedSimpleFormData).toEqual(unRandomizeResult(serializedData));
  });
});
