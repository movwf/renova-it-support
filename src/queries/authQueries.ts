import { gql } from '@apollo/client';

export const loginQuery = gql`
  query LoginUser($username: String!, $password: String!) {
    users(where: { username: { _eq: $username }, password: { _eq: $password } }) {
      username
      isAdmin
      email
    }
  }
`;

export const registerQuery = gql`
  mutation RegisterUser($username: String!, $password: String!, $email: String!) {
    insert_users_one(object: { username: $username, password: $password, email: $email }) {
      id
      username
      email
    }
  }
`;
