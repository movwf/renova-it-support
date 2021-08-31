/*
-------------------------------------------
                  USER
-------------------------------------------
*/

// =====>  Query : getUserRequests

export interface IUserRequest {
  __typename: string;
  created_At: string;
  product: {
    __typename: string;
    product_name: string;
  };
  request_id: string;
  status: string;
}

export interface IUserRequests {
  requests?: IUserRequest[];
  errors?: any;
}

/*
-------------------------------------------
                  ADMIN
-------------------------------------------
*/

export interface IAllRequests {
  __typename?: string;
  created_At: string;
  product: {
    __typename?: string;
    product_name: string;
  };
  request_id: string;
  status: string;
  store_id: string;
  service_note: string;
  serial_number: string;
  image_urls: Array<string>;
  customer_email: string;
  problem: string;
}
