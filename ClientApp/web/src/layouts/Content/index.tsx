import React from 'react';
import { Layout } from 'antd';

import BreadCrumbComponent from '@/components/Breadcrumb';

import styles from './Content.module.scss';

const { Content } = Layout;

interface ContentReceivedProps {
  children?: React.ReactNode
}

const ContentComponent = ({ children }: ContentReceivedProps) => (
  <Content className={styles.content}>
    <BreadCrumbComponent />
    {children}
  </Content>
);

export default ContentComponent;
