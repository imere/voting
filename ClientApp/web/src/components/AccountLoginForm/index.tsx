import React, { useState } from "react";
import { Button, Checkbox, Form, Icon, message } from "antd";
import { Link } from "react-router-dom";
import { FormComponentProps } from "antd/es/form/Form";
import { connect } from "react-redux";

import CheckboxItem from "@/layouts/AccountFormLayout/CheckboxItem";
import InputItem from "@/layouts/AccountFormLayout/InputItem";
import AccountFormLogo from "@/layouts/AccountFormLogo";
import { Routes } from "@/constants";
import { AuthAction, LoginCallback, UserAuthentication } from "@/actions/auth";
import { iu } from "@/actions";
import { ApplicationState } from "@/reducers";
import { Disp, ValidateStatus } from "@/types";
import { ResponseState } from "@/data-types";
import { passwordRules, usernameRules } from "@/shared/account-validate";

import styles from "./AccountLogin.module.scss";

type AccountLoginDispatch = Disp<ApplicationState, null, AuthAction>;

interface AccountLoginOwnStateProps {
  pending?: boolean
}

interface AccountLoginOwnDispatchProps {
  login: (user: UserAuthentication, cb?: LoginCallback) => void
}

interface AccountLoginOwnFormProps {
  form: FormComponentProps["form"]
}

type AccountLoginProps =
  AccountLoginOwnFormProps &
  AccountLoginOwnStateProps &
  AccountLoginOwnDispatchProps;

interface AccountLoginFormValues {
  username: string
  password: string
  confirm: string
  remember: boolean
}

const AccountLogin = ({ form, login, pending }: AccountLoginProps) => {

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

  const loginCallback: LoginCallback = (err, res) => {
    setLogining(false);
    if (err) {
      return message.error("请检查网络", 3);
    }
    if (res && 400 === res.status) {
      res.json().then((res: ResponseState) => {
        if (res.username) {
          setUsernameStatus("error");
          setUsernameHelp(res.username);
        }
        if (res.password) {
          setPasswordStatus("error");
          setPasswordHelp(res.password);
        }
        if (res?.data.username) {
          setUsernameStatus("error");
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    resetHelp();
    form.validateFields((err: Error, values: AccountLoginFormValues) => {
      if (err) {
        return;
      }
      setLogining(true);
      login({
        username: values.username,
        password: values.password,
        persist: values.remember,
      }, loginCallback);
    });
  }

  return (
    <>
      <Form style={{ display: "none" }}>
        <Form.Item><Checkbox /></Form.Item>
      </Form>
      <Form onSubmit={handleSubmit} className={styles["login-form"]}>

        <AccountFormLogo />

        <InputItem
          form={form}
          name="username"
          options={{
            rules: [
              {
                required: true,
                message: "请输入用户名"
              },
              ...usernameRules,
            ],
          }}
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="用户名"
          help={usernameHelp}
          validateStatus={usernameStatus}
        />

        <InputItem
          form={form}
          name="password"
          options={{
            rules: [
              {
                required: true,
                message: "请输入密码",
              },
              ...passwordRules,
            ],
          }}
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="密码"
          help={passwordHelp}
          validateStatus={passwordStatus}
        />

        <CheckboxItem
          form={form}
          name="remember"
          options={{
            valuePropName: "checked",
            initialValue: false,
          }}
          content="记住登录状态"
          append={
            <>
              <a className={styles["login-form-forgot"]}>
                忘记密码
              </a>
              <Button loading={pending || logining} type="primary" htmlType="submit" className={styles["login-form-button"]}>
                登录
              </Button>
              或 <Link to={Routes.USER_REGISTER}>注册</Link></>
          }
        />

      </Form>
    </>
  );
};

const mapStateToProps = (state: ApplicationState): AccountLoginOwnStateProps => ({
  pending: state.auth.pending,
});

const mapDispatchToProps = (dispatch: AccountLoginDispatch): AccountLoginOwnDispatchProps => ({
  login: (user, cb) => dispatch(iu.login(user, cb)),
});

export default Form.create({ name: "login" })(
  connect(mapStateToProps, mapDispatchToProps)(AccountLogin)
);




