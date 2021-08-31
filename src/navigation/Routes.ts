interface IRoutes {
  [route: string]: string;
}

const Routes: IRoutes = {
  home: '/',
  login: '/login',
  user: '/user',
  admin: '/admin',
  inquiry: '/service',
  request: '/request',
  check: '/request/check',
  status: '/request/status',
  repair: '/request/repair',
  selectProduct: '/request/repair/select-product',
  customerInfo: '/request/repair/customer-information',
  problem: '/request/repair/problem',
  submitForm: '/request/repair/submit',
  notFound: '*',
};

export default Routes;
