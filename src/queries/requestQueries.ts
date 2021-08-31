import { gql } from '@apollo/client';

/*
-------------------------------------------
                  USER
-------------------------------------------
*/

export const checkRequestStatus = gql`
  query checkRequestStatus($request_id: String!) {
    requests(where: { request_id: { _eq: $request_id } }) {
      request_id
      service_note
      status
    }
  }
`;

export const getUserRequests = gql`
  query getUserRequests($email: String!) {
    requests(where: { customer_email: { _eq: $email } }) {
      product {
        product_name
      }
      request_id
      created_At
      status
    }
  }
`;

export const createRequest = gql`
  mutation registerRequest(
    $request_id: String!
    $product_id: String!
    $serial_number: String!
    $problem: String!
    $image_urls: _text
    $agree_privacy: Boolean!
    $agree_tos: Boolean!
    $status: String
    $service_note: String
    $store_id: String
    $address: String!
    $birthdate: date!
    $customer_email: String!
    $name: String!
    $nationality_number: String!
  ) {
    insert_requests_one(
      object: {
        request_id: $request_id
        product_id: $product_id
        serial_number: $serial_number
        problem: $problem
        image_urls: $image_urls
        agree_privacy: $agree_privacy
        agree_tos: $agree_tos
        status: $status
        service_note: $service_note
        store_id: $store_id
        customer: {
          data: {
            address: $address
            birthdate: $birthdate
            email: $customer_email
            name: $name
            nationality_number: $nationality_number
          }
        }
      }
    ) {
      request_id
    }
  }
`;

/*
-------------------------------------------
                  ADMIN
-------------------------------------------
*/

export const getRequestData = gql`
  query getRequestData($request_id: String!) {
    requests(where: { request_id: { _eq: $request_id } }) {
      request_id
      service_note
      status
      created_At
      store_id
      problem
      customer {
        name
        email
      }
      image_urls
      serial_number
      product {
        product_name
      }
    }
  }
`;

export const getAllRequests = gql`
  query getAllRequests {
    requests {
      created_At
      customer_email
      image_urls
      problem
      request_id
      product {
        product_name
      }
      service_note
      serial_number
      status
      store_id
    }
  }
`;

export const updateRequest = gql`
  mutation updateRequest(
    $request_id: String!
    $status: String
    $store_id: String
    $service_note: String
  ) {
    update_requests_by_pk(
      pk_columns: { request_id: $request_id }
      _set: { status: $status, store_id: $store_id, service_note: $service_note }
    ) {
      request_id
    }
  }
`;
