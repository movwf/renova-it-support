// @ts-nocheck
import React from 'react';
import { screen, render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { getRequestData, updateRequest } from '../../../queries/requestQueries';

import EditModal from './index';

const mocks = [
  {
    request: {
      query: updateRequest,
      variables: {
        request_id: '1234-5678-01',
        status: 'inRepair',
        store_id: '01',
        service_note: 'Test Note',
      },
    },
    result: {
      data: {
        update_requests_by_pk: {
          request_id: '1234-5678-01',
          __typename: 'requests',
        },
      },
    },
  },
  {
    request: {
      query: getRequestData,
      variables: {
        request_id: '1234-5678-01',
      },
    },
    result: {
      data: {
        requests: [
          {
            request_id: '1234-5678-01',
            service_note: 'Test Note',
            status: 'inRepair',
            created_At: '2021-08-26',
            store_id: '01',
            problem: 'I have no cpu.',
            customer: {
              name: 'Carl Johnson',
              email: 'cj@renova.com',
              __typename: 'customers',
            },
            image_urls: [
              'https://images.hindustantimes.com/tech/img/2021/03/12/960x540/Bsodwindows10_1615531282718_1615531288724.png',
            ],
            serial_number: '123ABC456DEF00',
            product: {
              product_name: 'PC',
              __typename: 'products',
            },
            __typename: 'requests',
          },
        ],
      },
    },
  },
];

global.window.formDatas = {};
global.window.open = true;
global.window.show = () => {
  window.open = !window.open;
};

const id = '1234-5678-01';

describe('EditModal Component', () => {
  beforeEach(() => {});

  afterEach(() => {
    cleanup();
  });

  test('should be rendered', async () => {
    const stateSpy = jest.spyOn(React, 'useState');
    stateSpy.mockReturnValue([{}, () => {}]);
    render(
      <MockedProvider mocks={mocks}>
        <EditModal {...{ open: window.open, show: window.show, id }} />
      </MockedProvider>
    );

    // Wait for load
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
  });

  test('should be rendered (loading state)', async () => {
    const stateSpy = jest.spyOn(React, 'useState');
    stateSpy.mockReturnValue([{}, () => {}]);

    render(
      <MockedProvider mocks={mocks}>
        <EditModal {...{ open: window.open, show: window.show, id }} />
      </MockedProvider>
    );

    expect(screen.getByTestId('edit-modal-loading')).toBeInTheDocument();
  });

  test('should be closed when clicked close', async () => {
    const stateSpy = jest.spyOn(React, 'useState');
    const windowSpy = jest.spyOn(window, 'show');
    stateSpy.mockReturnValue([{}, () => {}]);

    render(
      <MockedProvider mocks={mocks}>
        <EditModal {...{ open: window.open, show: window.show, id }} />
      </MockedProvider>
    );

    // Wait for load
    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    const button = screen.getByTitle('Close');

    fireEvent.click(button);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    // If show function triggered it updates global open variable to false
    // There is no way to know if it is closed but unmounting from an element
    expect(windowSpy).toBeCalled();
  });

  test('should set formData state after status select is changed', async () => {
    const stateSpy = jest.spyOn(React, 'useState');
    stateSpy.mockReturnValue([{}, () => {}]);

    render(
      <MockedProvider mocks={mocks}>
        <EditModal {...{ open: window.open, show: window.show, id }} />
      </MockedProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    const statusSelect = screen.getByTestId('edit-modal-status-select');

    fireEvent.change(statusSelect, { target: { value: 'inRepair' } });

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(stateSpy).toBeCalledTimes(6);
  });

  test('should set formData state after store-id input is changed', async () => {
    const stateSpy = jest.spyOn(React, 'useState');
    stateSpy.mockReturnValue([{}, () => {}]);

    render(
      <MockedProvider mocks={mocks}>
        <EditModal {...{ open: window.open, show: window.show, id }} />
      </MockedProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    const storeIdInput = screen.getByTestId('edit-modal-store-id-input');

    fireEvent.change(storeIdInput, { target: { value: 'Test Note' } });

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(stateSpy).toBeCalledTimes(6);
  });

  test('should set formData state after service-note input is changed', async () => {
    const stateSpy = jest.spyOn(React, 'useState');
    stateSpy.mockReturnValue([{}, () => {}]);

    render(
      <MockedProvider mocks={mocks}>
        <EditModal {...{ open: window.open, show: window.show, id }} />
      </MockedProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    const serviceNoteInput = screen.getByTestId('edit-modal-service-note-input');

    fireEvent.change(serviceNoteInput, { target: { value: '01' } });

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(stateSpy).toBeCalledTimes(6);
  });

  test('should fire update query after modal submitted', async () => {
    const logSpy = jest.spyOn(console, 'log');
    logSpy.mockImplementation((value: any) => {
      window.updateData = value;
    });
    const stateSpy = jest.spyOn(React, 'useState');
    stateSpy.mockReturnValue([{}, () => {}]);

    render(
      <MockedProvider mocks={mocks}>
        <EditModal {...{ open: window.open, show: window.show, id }} />
      </MockedProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    const statusSelect = screen.getByTestId('edit-modal-status-select');
    const storeIdInput = screen.getByTestId('edit-modal-store-id-input');
    const serviceNoteInput = screen.getByTestId('edit-modal-service-note-input');
    const button = screen.getByText('Update');

    fireEvent.change(statusSelect, { target: { value: 'inRepair' } });
    fireEvent.change(storeIdInput, { target: { value: 'Test Note' } });
    fireEvent.change(serviceNoteInput, { target: { value: '01' } });

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    fireEvent.click(button);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(window.updateData).toEqual(mocks[0].result);
  });

  test('should fire update query after modal submitted (without changes)', async () => {
    const undefs = {
      status: undefined,
      store_id: undefined,
      service_note: undefined,
    };

    const logSpy = jest.spyOn(console, 'log');
    logSpy.mockImplementation((value: any) => {
      window.formDatas = value;
    });

    const stateSpy = jest.spyOn(React, 'useState');
    stateSpy.mockReturnValue([undefs, () => {}]);

    render(
      <MockedProvider mocks={mocks}>
        <EditModal {...{ open: window.open, show: window.show, id }} />
      </MockedProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0))); // Wait for loading

    const button = screen.getByText('Update');

    fireEvent.click(button);

    await waitFor(() => new Promise((res) => setTimeout(res, 0))); // Wait for update

    expect(window.formDatas).toEqual(mocks[0].result);
  });
});
