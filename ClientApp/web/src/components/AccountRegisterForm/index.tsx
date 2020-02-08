import Form, { FormComponentProps } from "antd/lib/form/Form";
import React, { useState } from "react";
import { Button, Checkbox, Icon, message } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CheckboxItem from "@/components/FormUnits/CheckboxItem";
import InputItem from "@/components/FormUnits/InputItem";
import AccountFormLogo from "@/layouts/AccountFormLogo";
import { Routes } from "@/constants";
import { AuthAction, RegisterCallback, UserAuthentication } from "@/actions/auth";
import { iu } from "@/actions";
import { ApplicationState } from "@/reducers";
import { Disp, ResponseState, ValidateStatus } from "@/types";
import { passwordRules, usernameRules } from "@/shared/validate-utils";

import styles from "./AccountRegister.module.scss";

type AccountRegisterDispatch = Disp<ApplicationState, null, AuthAction>

interface AccountRegisterOwnStateProps {
  pending?: boolean
}

interface AccountRegisterOwnDispatchProps {
  register: (user: UserAuthentication, cb?: RegisterCallback) => void
}

interface AccountRegisterOwnFormProps {
  form: FormComponentProps["form"]
}

type AccountRegisterProps =
  AccountRegisterOwnFormProps
  & AccountRegisterOwnStateProps
  & AccountRegisterOwnDispatchProps;

interface AccountRegisterFormValues {
  username: string
  password: string
  confirm: string
}

const AccountRegister = ({ form, register, pending }: AccountRegisterProps) => {
  const [
    confirmDirty,
    setConfirmDirty
  ] = useState(false);

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
    registering,
    setRegistering
  ] = useState(false);

  const registerCallback: RegisterCallback = (err, res) => {
    setRegistering(false);
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
        if (res?.data?.username) {
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
    form.validateFieldsAndScroll((err, values: AccountRegisterFormValues) => {
      if (err) {
        return;
      }
      setRegistering(true);
      register({
        username: values.username,
        password: values.password,
      }, registerCallback);
    });
  }

  function handleConfirmBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  }

  function compareToFirstPassword(_: any, value: string | undefined, callback: Function) {
    if (value && value !== form.getFieldValue("password")) {
      return callback("两次密码不一致");
    }
    callback();
  }

  function ensureFilled(_: any, value: boolean, callback: Function) {
    if (
      form.getFieldValue("username")
      && form.getFieldValue("password")
      && form.getFieldValue("confirm")
    ) {
      if (value) {
        return callback();
      }
      return callback("需要同意协议");
    }
    callback();
  }

  function validateToNextPassword(_: any, value: string | undefined, callback: Function) {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  }

  return (
    <>
      <Form style={{ display: "none" }}>
        <Form.Item>
          {form.getFieldDecorator("_pre", {
            valuePropName: "checked",
            initialValue: false,
          })(
            <Checkbox />
          )}
        </Form.Item>
      </Form>
      <Form onSubmit={handleSubmit} className={styles["register-form"]}>

        <AccountFormLogo />

        <InputItem
          form={form}
          name="username"
          options={{
            rules: [
              {
                required: true,
                message: "请输入用户名",
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
              {
                validator: validateToNextPassword,
              },
            ],
          }}
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="密码"
          help={passwordHelp}
          validateStatus={passwordStatus}
        />

        <InputItem
          form={form}
          name="confirm"
          options={{
            rules: [
              {
                required: true,
                message: "请再输入一次密码",
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          }}
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="确认密码"
          onBlur={handleConfirmBlur}
        />

        <CheckboxItem
          form={form}
          name="agreement"
          options={{
            valuePropName: "checked",
            initialValue: false,
            rules: [
              {
                required: true,
              },
              {
                validator: ensureFilled,
              },
            ],
          }}
          content="我已阅读"
          append={
            <>
              <a>服务协议</a>
              <Link className={styles["register-form-registered"]} to={Routes.USER_LOGIN}>已注册?</Link>
              <Button loading={pending || registering} type="primary" htmlType="submit" className={styles["register-form-button"]}>注册</Button>
            </>
          }
        />

      </Form>
    </>
  );
};

const mapStateToProps = (state: ApplicationState): AccountRegisterOwnStateProps => ({
  pending: state.auth.pending,
});

const mapDispatchToProps = (dispatch: AccountRegisterDispatch): AccountRegisterOwnDispatchProps => ({
  register: (user, cb) => dispatch(iu.register(user, cb)),
});

export default Form.create({ name: "register" })(
  connect(mapStateToProps, mapDispatchToProps)(AccountRegister)
);
