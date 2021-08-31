import React from 'react';
import { Button, Column, Grid, Row } from 'carbon-components-react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import styles from './Repair.module.css';

import Submit from './FormPages/Submit';
import Problem from './FormPages/Problem';
import PageHeading from '../../../components/PageHeading';
import FormProgress from './FormProgress';
import ReservedRoute from '../../../navigation/ReservedRoute';
import SelectProduct from './FormPages/SelectProduct';
import CustomerInformation from './FormPages/CustomerInformation';

import { FormContext } from '../../../contexts/FormContext';
import RequestFormButtonStates from './RequestFormButtonStates';
import Routes from '../../../navigation/Routes';

type NavigateTo = string | any;
type Params = { [key: string]: any };

function Repair() {
  const { barIndex, setBarIndex, handlers, saveFormData } = React.useContext(FormContext);
  const history = useHistory();

  const navigateToPage = (from: string, to: NavigateTo, ...params: Params[]) => {
    history.push(to, Object.assign({ prevPath: from }, ...params));
  };

  const navigateNextPage = (data: any) => {
    console.log('Page Data : ', data);

    // TODO: Loading spinner

    saveFormData(data) // Save partial form data to store
      .then((status: any) => {
        // If data is savesd
        if (status.isSaved) {
          // Navigate next page if there is data
          if (status.data)
            navigateToPage(
              RequestFormButtonStates[barIndex].path,
              RequestFormButtonStates[barIndex].nextPage,
              status.data
            );
          // Navigate next page if request not fulfilled
          else
            navigateToPage(
              RequestFormButtonStates[barIndex].path,
              RequestFormButtonStates[barIndex].nextPage
            );

          // Iterate for progress bar
          if (barIndex !== 3) setBarIndex(barIndex + 1); // 0 -> 3
        }
      });
  };

  const navigatePrevPage = () => {
    if (barIndex !== 0) setBarIndex(barIndex - 1); // 3 -> 0

    navigateToPage(
      RequestFormButtonStates[barIndex].path,
      RequestFormButtonStates[barIndex].prevPage
    );
  };

  const navigateToRequestPage = () => {
    navigateToPage(RequestFormButtonStates[barIndex].path, Routes.inquiry);
  };

  return (
    <Grid fullWidth data-testid="repair-page">
      <PageHeading title="Request Repair" />
      <Column>
        <FormProgress currentIndex={barIndex} />
        {/* Form Router */}
        <Row className={styles.FormPages}>
          <Switch>
            {/* Main route redirects to form's initial page */}
            <Route exact path={Routes.repair}>
              <Redirect
                to={{
                  pathname: Routes.selectProduct,
                  state: { prevPath: window.location.pathname },
                }}
              />
            </Route>
            {/* Select Product Form Page */}
            <ReservedRoute
              path={Routes.selectProduct}
              reservedRoutes={[Routes.repair, Routes.customerInfo]}
              redirect={Routes.repair}
              component={SelectProduct}
            />
            {/* Customer Information Form Page */}
            <ReservedRoute
              path={Routes.customerInfo}
              reservedRoutes={[Routes.selectProduct, Routes.problem]}
              redirect={Routes.repair}
              component={CustomerInformation}
            />
            {/* Problem Form Page */}
            <ReservedRoute
              path={Routes.problem}
              reservedRoutes={[Routes.customerInfo, Routes.submitForm]}
              redirect={Routes.repair}
              component={Problem}
            />
            {/* Submit Form Page */}
            <ReservedRoute
              path={Routes.submitForm}
              reservedRoutes={[Routes.problem]}
              redirect={Routes.repair}
              component={Submit}
            />
          </Switch>
        </Row>

        <Row className={styles.ButtonGroup}>
          {/* Cancel Button */}
          <Button
            kind="ghost"
            className={styles.Button}
            onClick={() => navigateToRequestPage()}
            data-testid="cancel-button"
          >
            Cancel
          </Button>
          {/* Previous Button */}
          {RequestFormButtonStates[barIndex].secondary && (
            <Button
              kind="secondary"
              className={styles.Button}
              onClick={() => navigatePrevPage()}
              data-testid="prev-button"
            >
              {RequestFormButtonStates[barIndex].secondary}
            </Button>
          )}
          {/* Next / Submit / Done Button */}
          <Button
            className={styles.Button}
            onClick={handlers[barIndex]((data: any) => navigateNextPage(data))}
            data-testid="submit-button"
          >
            {RequestFormButtonStates[barIndex].default}
          </Button>
        </Row>
      </Column>
    </Grid>
  );
}

export default Repair;
