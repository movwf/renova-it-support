import yup from './_yup';
import { isDateValid } from './utils';

/*
  PAGE 1 : SELECT PRODUCT
*/
export const selectProduct = yup.object().shape({
  serialNumber: yup.string().length(15).optional(),
  agree: yup.object().shape({
    privacy: yup.boolean().required(),
  }),
});

/*
  PAGE 2 : CUSTOMER INFORMATION
*/
export const customerInformation = yup.object().shape({
  agree: yup.object().shape({
    tos: yup.boolean().required(),
  }),
  name: yup
    .string()
    .required()
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  email: yup.string().email().required(),
  nationalityId: yup
    .string()
    .length(11)
    .matches(/[0-9]{1}/)
    .required(),
  birthdate: yup
    .date()
    .transform((currentDate, initialDate) =>
      initialDate === '' ? new Date(Date.now()) : currentDate
    )
    .required()
    .test('minDate', 'Birthdate must be later than 31/12/1899', (date) => isDateValid(date, 'min'))
    .test('maxDate', 'Must be at least 18 years old.', (date) => isDateValid(date, 'max')),
  address: yup.string().min(20).max(500).required(),
});

/*
  PAGE 3 : PROBLEM
*/

/*
  DISCLAIMER!

  Carbon Design - File Uploader component doesn't work with react hook form's 
  ref system. It only returns file input's size and name mock values.
  To fix it only passed e.target.files ( FileList ) on onChange for validation,
  but now everytime file input is validated "empty" it crashes whole application.
  Just because it goes for ref catching of that input. And it never catches sth
  it already not has.

  Note: FileUploader ref doesn't work as it should be.

*/

// const checkFileTypes = (files: any) => {
//   const fileKeys = Object.keys(files);
//   return fileKeys.every((key) => SUPPORTED_FORMATS.includes(files[key].type));
// };

// const checkFileSizes = (files: any) => {
//   const fileKeys = Object.keys(files);
//   return fileKeys.every((key) => files[key].size <= MAX_FILE_SIZE);
// };

export const problem = yup.object().shape({
  problem: yup.string().min(20).max(500).required(),
  // images: yup
  //   .mixed()
  //   .nullable()
  //   .required()
  //   .test('fileFormat', 'Uploaded file has unsupported format.', (value) => checkFileTypes(value))
  //   .test('fileSize', 'Uploaded file is too big.', (value) => checkFileSizes(value)),
});

const repairSchema = {
  selectProduct,
  customerInformation,
  problem,
};

export default repairSchema;
