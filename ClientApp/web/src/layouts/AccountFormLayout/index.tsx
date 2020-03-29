import React from 'react';
import { Layout } from 'antd';

import AccountFormLogo from '@/layouts/AccountFormLogo';
import FooterComponent from '@/layouts/Footer';

import styles from './AccountFormLayout.module.scss';

const { Content } = Layout;

interface AccountLayoutReceivedProps {
  children: React.ReactNode;
}

type AccountLayoutProps = AccountLayoutReceivedProps;

const AccountFormLayout: React.FC<AccountLayoutProps> = ({ children }: AccountLayoutProps) => (
  <Layout style={{ 'minHeight': '100vh' }}>

    <Content className={styles['account-form-content']}>
      <AccountFormLogo />
      {children}
    </Content>

    <FooterComponent />

  </Layout>
);

export default AccountFormLayout;
