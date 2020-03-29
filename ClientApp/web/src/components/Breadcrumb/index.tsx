import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import { Routes } from '@/constants';
import { RouteNameMap } from './util';

import styles from './Breadcrumb.module.scss';

const BreadCrumbComponent = () => {
  const { pathname } = location;
  const paths = pathname.split('/').slice(1);
  return (
    <div className={styles.breadcrumb}>
      <Breadcrumb>
        {
          [
            <Breadcrumb.Item key="/">
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
          ].
            concat(
              paths.map((_, i) => {
                const route = `/${paths.slice(0, i + 1).join('/')}`;
                return (
                  <Breadcrumb.Item key={i}>
                    {
                      Object.values(Routes).some((value) => route === value.split('/:')[0])
                        ? <Link to={route}>{RouteNameMap[route]}</Link>
                        : null
                    }
                  </Breadcrumb.Item>
                );
              }).filter((r) => r)
            )
        }
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbComponent;
