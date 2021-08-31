import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

import { FormContext, FormProvider } from './FormContext';
import { createRequest } from '../queries/requestQueries';
import serializeFormData from '../helpers/serializeFormData';
import '../helpers/generateRequestId';

jest.mock('../helpers/generateRequestId', () => () => ({ id: '8681-2833-01', store: '01' }));

const mockFormData = {
  serialNumber: '1234567890ABCDE',
  product: 'notebook',
  agree: {
    tos: true,
    privacy: true,
  },
  address: 'Test Street. Jest Boulevard',
  birthdate: '1998-12-31T22:00:00.000Z',
  nationalityId: '12345678901',
  email: 'a@a.com',
  name: 'Function Test',
  problem: "My computer doesn't work.",
  images: ['https://res.cloudinary.com/kt-sec/image/upload/v1630256345/nvwrifgvmihq9dhsqsqd.png'],
};

const mocks = [
  {
    request: {
      query: createRequest,
      variables: serializeFormData(mockFormData),
    },
    result: {
      data: {
        insert_requests_one: {
          request_id: '8681-2833-01',
          __typename: 'requests',
        },
      },
    },
  },
];

// const FormComponent = () => {
//   return (
//     <FormProvider>
//       <div>
//         <button type="button" data-testid="button">
//           Click
//         </button>
//       </div>
//     </FormProvider>
//   );
// };

// @ts-ignore
global.window.stateMachine = {
  test: false,
};

describe('FormContext', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should wrap a component', () => {
    const Component = () => <div data-testid="component">Test</div>;

    render(
      <MockedProvider mocks={mocks}>
        <FormProvider>
          <Component />
        </FormProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('component')).toBeInTheDocument();
  });

  test('should only update formData state if not in problem page (last form)', async () => {
    const Component = () => {
      const { saveFormData } = React.useContext(FormContext);

      const handleSave = () => {
        saveFormData(mockFormData).then((res: any) => {
          // @ts-ignore
          window.isFormSaved = res.isSaved;
        });
      };

      return (
        <div data-testid="component">
          <button type="button" data-testid="button" onClick={() => handleSave()}>
            Click
          </button>
        </div>
      );
    };

    render(
      <MockedProvider mocks={mocks}>
        <FormProvider>
          <Component />
        </FormProvider>
      </MockedProvider>
    );

    const button = screen.getByTestId('button');

    fireEvent.click(button);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    // @ts-ignore
    expect(global.window.isFormSaved).toBe(true);
  });

  test('should trigger request register to DB function if in last form page (last form) ', async () => {
    const logSpy = jest.spyOn(console, 'log');
    logSpy.mockImplementation(() => {});
    const Component = () => {
      const { saveFormData, barIndex, setBarIndex } = React.useContext(FormContext);

      const handleSave = () => {
        saveFormData(mockFormData).then((res: any) => {
          // @ts-ignore
          window.formData = res;
        });
      };

      return (
        <div data-testid="component">
          <span>{barIndex}</span>
          <button type="button" data-testid="button-index" onClick={() => setBarIndex(2)}>
            Click
          </button>
          <button type="button" data-testid="button" onClick={() => handleSave()}>
            Click
          </button>
        </div>
      );
    };

    render(
      <MockedProvider mocks={mocks}>
        <FormProvider>
          <Component />
        </FormProvider>
      </MockedProvider>
    );

    const button = screen.getByTestId('button');
    const buttonIndex = screen.getByTestId('button-index');

    fireEvent.click(buttonIndex);
    fireEvent.click(button);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    // Calculated object -> Mock request response
    // @ts-ignore
    expect(window.formData.data).toEqual(mocks[0].result.data.insert_requests_one);
  });
});
