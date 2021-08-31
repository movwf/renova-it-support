import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

import Problem from './index';
import { FormProvider } from '../../../../../contexts/FormContext';

describe('Problem Page', () => {
  test('should be rendered', () => {
    render(
      <MockedProvider>
        <FormProvider>
          <Problem />
        </FormProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('problem-page')).toBeInTheDocument();
  });

  test('should upload image when files selected', async () => {
    render(
      <MockedProvider>
        <FormProvider>
          <Problem />
        </FormProvider>
      </MockedProvider>
    );

    const uploader = screen.getByTestId('file-uploader').children[3];
    const files = [
      new File(['hello'], 'hello.png', { type: 'image/png' }),
      new File(['there'], 'there.png', { type: 'image/png' }),
    ];

    await waitFor(() => userEvent.upload(uploader, files));

    // @ts-ignore
    expect(Array.from(uploader.files)).toHaveLength(2);
  });
});
