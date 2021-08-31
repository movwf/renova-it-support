import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';

import { createRequest } from '../queries/requestQueries';
import repairSchema from '../configs/validations/Repair.schema';
import serializeFormData from '../helpers/serializeFormData';
import { IFormData, IFormObject, IFormProvider } from './types/FormContext.types';

export const FormContext = React.createContext<IFormData>({
  barIndex: 0,
});

export function FormProvider({ children }: IFormProvider) {
  const [barIndex, setBarIndex] = React.useState(0); // ProgressBar
  const [formData, setFormData] = React.useState({}); // Multiple page validation store
  const [saveRequest] = useMutation(createRequest);

  const forms = {
    selectProduct: useForm({
      defaultValues: formData,
      resolver: yupResolver(repairSchema.selectProduct),
    }),
    customerInformation: useForm({
      defaultValues: formData,
      mode: 'all',
      resolver: yupResolver(repairSchema.customerInformation),
    }),
    problem: useForm({
      defaultValues: formData,
      resolver: yupResolver(repairSchema.problem),
    }),
  };

  // For navigation buttons based on barIndex
  const handlers = {
    0: forms.selectProduct.handleSubmit,
    1: forms.customerInformation.handleSubmit,
    2: forms.problem.handleSubmit,
    3: () => {},
  };

  const registerRequest = async () => {
    let data = {};

    await saveRequest({
      // Serialize raw data for saving to DB
      variables: serializeFormData(formData),
    }).then((res) => {
      // Data returns under mutation function name : insert_requests_one
      // @ts-ignore
      data = res.data.insert_requests_one;
    });

    return data;
  };

  const saveFormData = async (formObj: IFormObject) => {
    let status = { isSaved: true };

    setFormData(Object.assign(formData, formObj));

    // Problem page submitted
    if (barIndex === 2) {
      await registerRequest().then((res) => {
        console.log('Request response : ', res);

        status = Object.assign(status, { data: res });
      });
    }

    return status;
  };

  const value = {
    barIndex,
    setBarIndex,
    formData,
    saveFormData,
    forms,
    handlers,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
