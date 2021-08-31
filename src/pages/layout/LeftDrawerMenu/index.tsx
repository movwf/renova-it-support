import React from 'react';
import ReactDOM from 'react-dom';
import { HeaderMenuItem, HeaderSideNavItems, SideNav, SideNavItems } from 'carbon-components-react';
import Routes from '../../../navigation/Routes';

const APP_PORTAL_NODE = 'portal-node';

interface ILeftDrawerMenu {
  isSideNavExpanded: boolean;
}

function LeftDrawerMenu({ isSideNavExpanded }: ILeftDrawerMenu) {
  const portalNode = document.getElementById(APP_PORTAL_NODE);

  return portalNode && isSideNavExpanded
    ? ReactDOM.createPortal(
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
          data-testid="left-drawer"
        >
          <SideNavItems>
            <HeaderSideNavItems>
              <HeaderMenuItem href={Routes.home}>Home</HeaderMenuItem>
              <HeaderMenuItem href={Routes.home}>Services</HeaderMenuItem>
              <HeaderMenuItem href={Routes.home}>Support</HeaderMenuItem>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>,
        portalNode
      )
    : null;
}

export default React.memo(LeftDrawerMenu);
