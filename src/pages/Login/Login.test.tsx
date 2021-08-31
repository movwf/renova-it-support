import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import * as Toastify from 'react-toastify';
import '@testing-library/jest-dom';

import { AuthProvider } from '../../contexts/AuthContext';
import Admin from '../Admin';
import Login from './index';
import User from '../User';
import { getAllRequests, getUserRequests } from '../../queries/requestQueries';
import { loginQuery } from '../../queries/authQueries';

const mocks = [
  {
    request: {
      query: loginQuery,
      variables: {
        username: 'mehmet',
        password: 'test123456',
      },
    },
    result: {
      data: {
        users: [
          {
            username: 'mehmet',
            isAdmin: false,
            email: 'uskudar@renova.com',
            __typename: 'users',
          },
        ],
      },
    },
  },
  {
    request: {
      query: loginQuery,
      variables: {
        username: 'deneme',
        password: 'deneme',
      },
    },
    result: {
      data: {
        users: [],
      },
    },
  },
  {
    request: {
      query: getUserRequests,
      variables: {
        email: 'user@kodluyoruz.org',
      },
    },
    result: {
      data: {
        requests: [
          {
            product: {
              product_name: 'CPU',
              __typename: 'products',
            },
            request_id: '2345-6780-02',
            created_At: '2021-08-26',
            status: 'inRepair',
            __typename: 'requests',
          },
        ],
      },
    },
  },
  {
    request: {
      query: getAllRequests,
      variables: {},
    },
    result: {
      data: {
        requests: [
          {
            created_At: '2021-08-27',
            customer_email: 'berk.kurtlu.99@hotmail.com',
            image_urls: [
              'https://res.cloudinary.com/kt-sec/image/upload/v1630065273/w3lmwrsof01kugoyzd7f.png',
            ],
            problem: 'GTA5 açmıyor :S Yardım edin :S',
            request_id: '3655-0078-01',
            product: {
              product_name: 'Video Card',
              __typename: 'products',
            },
            service_note: null,
            serial_number: 'ASU12302B/2GTA5',
            status: 'inRequest',
            store_id: '01',
            __typename: 'requests',
          },
          {
            created_At: '2021-08-26',
            customer_email: 'uskudar@renova.com',
            image_urls: [],
            problem: 'My cpu is hot',
            request_id: '2345-6780-02',
            product: {
              product_name: 'CPU',
              __typename: 'products',
            },
            service_note: 'We will get back at you, ASAP!',
            serial_number: '234EFG568WKR01A',
            status: 'inRepair',
            store_id: '02',
            __typename: 'requests',
          },
          {
            created_At: '2021-08-29',
            customer_email: 'a@a.com',
            image_urls: [
              'https://res.cloudinary.com/kt-sec/image/upload/v1630256345/nvwrifgvmihq9dhsqsqd.png',
            ],
            problem: "My computer doesn't work.",
            request_id: '8681-2833-01',
            product: {
              product_name: 'Notebook',
              __typename: 'products',
            },
            service_note: null,
            serial_number: '1234567890ABCDE',
            status: 'inRequest',
            store_id: '01',
            __typename: 'requests',
          },
        ],
      },
    },
  },
];

describe('Login', () => {
  afterEach(() => {
    jest.clearAllMocks();

    global.window.localStorage.clear();
  });

  test('should be rendered', () => {
    const { getByTestId } = render(<Login />);

    expect(getByTestId('login')).toBeInTheDocument();
  });

  test('should redirect to admin page if logged as admin', async () => {
    // Admin scenario
    global.window.localStorage.setItem('isAuthenticated', 'true');
    global.window.localStorage.setItem(
      'client-user',
      JSON.stringify({ users: [{ username: 'Test', isAdmin: true }] })
    );
    render(
      <AuthProvider>
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/user">
              <User />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByTestId('admin-page')).toBeInTheDocument();
  });

  test('should redirect to admin page if logged as admin', async () => {
    // User scenario
    global.window.localStorage.setItem('isAuthenticated', 'true');
    global.window.localStorage.setItem(
      'client-user',
      JSON.stringify({
        users: [{ email: 'user@kodluyoruz.org', username: 'Test', isAdmin: false }],
      })
    );

    render(
      <AuthProvider>
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/user">
              <User />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByTestId('user-page')).toBeInTheDocument();
  });

  test('should show a success notification after successfull login', async () => {
    const toastSpy = jest.spyOn(Toastify, 'toast');

    render(
      <AuthProvider>
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/user">
              <User />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    const usernameInput = screen.getByTestId('login-input-username');
    const passwordInput = screen.getByTestId('login-input-password');
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(usernameInput, { target: { value: 'mehmet' } });
    fireEvent.change(passwordInput, { target: { value: 'test123456' } });
    fireEvent.click(loginButton);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(toastSpy).toBeCalled();
  });

  test('should show an error notification if credentials are not valid', async () => {
    const toastSpy = jest.spyOn(Toastify, 'toast');

    render(
      <AuthProvider>
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/user">
              <User />
            </Route>
          </MemoryRouter>
        </MockedProvider>
      </AuthProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    const usernameInput = screen.getByTestId('login-input-username');
    const passwordInput = screen.getByTestId('login-input-password');
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(usernameInput, { target: { value: 'deneme' } });
    fireEvent.change(passwordInput, { target: { value: 'deneme' } });
    fireEvent.click(loginButton);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(toastSpy).toBeCalled();
  });
});
