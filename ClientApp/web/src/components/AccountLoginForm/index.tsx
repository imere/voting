import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Store } from 'rc-field-form/es/interface';

import { Routes } from '@/constants';
import { AuthAction, LoginCallback, UserAuthentication } from '@/store/actions/action-auth';
import { ApplicationState } from '@/store/state';
import { Disp, ValidateStatus } from '@/types';
import { ResponseState } from '@/response';
import { passwordRules, usernameRules } from '@/shared/validate';
import { toastMessageByStatus } from '@/framework/shared/toast-message';

import styles from './AccountLogin.module.scss';

type AccountLoginDispatch = Disp<ApplicationState, null, AuthAction>;

interface AccountLoginOwnStateProps {
  pending?: boolean
}

interface AccountLoginOwnDispatchProps {
  login: (user: UserAuthentication, cb?: LoginCallback) => void
}

type AccountLoginProps =
  AccountLoginOwnStateProps &
  AccountLoginOwnDispatchProps;

// interface AccountLoginFormValues {
//   username: string
//   password: string
//   confirm: string
//   remember: boolean
// }

const AccountLogin = ({ login, pending }: AccountLoginProps) => {
  const [
    usernameHelp,
    setUsernameHelp
  ] = useState<React.ReactNode | undefined>(undefined);

  const [
    usernameStatus,
    setUsernameStatus
  ] = useState<ValidateStatus | undefined>(undefined);

  const [
    passwordHelp,
    setPasswordHelp
  ] = useState<React.ReactNode | undefined>(undefined);

  const [
    passwordStatus,
    setPasswordStatus
  ] = useState<ValidateStatus | undefined>(undefined);

  const [
    logining,
    setLogining
  ] = useState(false);

  const loginCallback: LoginCallback = (_, response) => {
    setLogining(false);
    toastMessageByStatus(response?.status, [400]);
    if (response?.status === 400) {
      response.json().then((res: ResponseState) => {
        if (res.username) {
          setUsernameStatus('error');
          setUsernameHelp(res.username);
        }
        if (res.password) {
          setPasswordStatus('error');
          setPasswordHelp(res.password);
        }
        if (res.data?.username) {
          setUsernameStatus('error');
          setUsernameHelp(res.data.username);
        }
      });
    }
  };

  function resetHelp() {
    setUsernameHelp(undefined);
    setUsernameStatus(undefined);
    setPasswordHelp(undefined);
    setPasswordStatus(undefined);
  }

  function onFinish(values: Store) {
    resetHelp();
    setLogining(true);
    login({
      username: values.username,
      password: values.password,
      persist: values.remember,
    }, loginCallback);
  }

  return (
    <Form
      className={styles['login-form']}
      onFinish={onFinish}
    >

      <Form.Item
        name="username"
        help={usernameHelp}
        validateStatus={usernameStatus}
        rules={usernameRules}
      >
        <Input placeholder="用户名" prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
      </Form.Item>

      <Form.Item
        name="password"
        help={passwordHelp}
        validateStatus={passwordStatus}
        rules={passwordRules}
      >
        <Input type="password" placeholder="密码" prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
      </Form.Item>

      <Form.Item>
        <Form.Item
          noStyle
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>记住登录状态</Checkbox>
        </Form.Item>
        <a className={styles['login-form-forgot']}>
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button loading={pending || logining} type="primary" htmlType="submit" className={styles['login-form-button']}>
          登录
        </Button>
        <span>或</span><Link to={Routes.USER_REGISTER}>注册</Link>
      </Form.Item>

    </Form>
  );
};

const mapStateToProps = (state: ApplicationState): AccountLoginOwnStateProps => ({
  pending: state.auth.pending,
});

const mapDispatchToProps = (dispatch: AccountLoginDispatch): AccountLoginOwnDispatchProps => ({
  login: (user, cb) => import('@/store/actions').then(({ iu }) => dispatch(iu.login(user, cb))),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountLogin);




