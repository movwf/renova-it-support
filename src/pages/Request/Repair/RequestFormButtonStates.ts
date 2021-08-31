import Routes from '../../../navigation/Routes';

interface IRequestFormButtonStates {
  [index: string]: {
    default: string;
    secondary?: string;
    path: string;
    nextPage: string;
    prevPage?: string;
  };
}

const RequestFormButtonStates: IRequestFormButtonStates = {
  0: {
    default: 'Next',
    secondary: 'Previous',
    path: Routes.selectProduct,
    nextPage: Routes.customerInfo,
  },
  1: {
    default: 'Next',
    secondary: 'Previous',
    path: Routes.customerInfo,
    nextPage: Routes.problem,
    prevPage: Routes.selectProduct,
  },
  2: {
    default: 'Next',
    secondary: 'Previous',
    path: Routes.problem,
    nextPage: Routes.submitForm,
    prevPage: Routes.customerInfo,
  },
  3: {
    default: 'Done',
    path: Routes.submitForm,
    nextPage: Routes.home,
  },
};

export default RequestFormButtonStates;
