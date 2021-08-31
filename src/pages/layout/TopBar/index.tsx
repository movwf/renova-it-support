/* eslint-disable no-console */
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderContainer,
  HeaderMenuItem,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from 'carbon-components-react';
import { User24 } from '@carbon/icons-react';
import LeftDrawerMenu from '../LeftDrawerMenu';
import Routes from '../../../navigation/Routes';

function TopBar() {
  const history = useHistory();

  const redirectLogin = () => {
    history.replace(Routes.login);
  };

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Rènova IT Platform" data-testid="top-bar">
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href={Routes.home} prefix="Rènova">
            [IT]
          </HeaderName>
          <HeaderNavigation aria-label="Rènova [IT] Main Menu">
            <HeaderMenuItem href={Routes.home}>Home</HeaderMenuItem>
            <HeaderMenuItem href="#">Services</HeaderMenuItem>
            <HeaderMenuItem href={Routes.home}>Support</HeaderMenuItem>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Login"
              onClick={() => redirectLogin()}
              tooltipAlignment="end"
              data-testid="topbar-login-button"
            >
              <User24 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <LeftDrawerMenu {...{ isSideNavExpanded }} />
        </Header>
      )}
    />
  );
}

export default React.memo(TopBar);
