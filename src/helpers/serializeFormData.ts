import generateRequestId from './generateRequestId';

// Convert to DB Array String
export const getArrayString = (arr: Array<any>) =>
  JSON.stringify(arr).replace('[', '{').replace(']', '}');

/**
 * This function helps to serialize react-hook-form's
 * form data into database fields.
 * Note: Some custom configurations included.
 * @returns Serialized version of form data
 */
const serializeFormData = (formData: any) => {
  const requestId = generateRequestId();

  const serializedFormData = {
    request_id: requestId.id,
    store_id: requestId.store,
    product_id: formData.product,
    serial_number: formData.serialNumber,
    name: formData.name,
    customer_email: formData.email,
    nationality_number: formData.nationalityId,
    birthdate: formData.birthdate,
    address: formData.address,
    problem: formData.problem,
    image_urls: formData.images ? getArrayString(formData.images) : '{}',
    agree_privacy: true,
    agree_tos: true,
    status: 'inRequest',
  };

  return serializedFormData;
};

export default serializeFormData;
