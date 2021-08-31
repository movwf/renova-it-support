import React from 'react';
import styles from './Layout.module.css';
import TopBar from './TopBar';
import Footer from './Footer';

interface ILayout {
  children: JSX.Element;
}

function Layout({ children }: ILayout) {
  return (
    <div data-testid="layout">
      <TopBar />
      {/* Main Content */}
      <main className={styles.MainContent}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
