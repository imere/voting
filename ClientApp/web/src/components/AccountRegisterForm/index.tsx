import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Store, ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Routes } from "@/constants";
import { AuthAction, RegisterCallback, UserAuthentication } from "@/actions/action-auth";
import { iu } from "@/actions";
import { ApplicationState } from "@/reducers/states";
import { Disp, ValidateStatus } from "@/types";
import { ResponseState } from "@/data-types";
import { passwordRules, usernameRules } from "@/shared/account-validate";

import styles from "./AccountRegister.module.scss";

type AccountRegisterDispatch = Disp<ApplicationState, null, AuthAction>

interface AccountRegisterOwnStateProps {
  pending?: boolean
}

interface AccountRegisterOwnDispatchProps {
  register: (user: UserAuthentication, cb?: RegisterCallback) => void
}

type AccountRegisterProps =
  AccountRegisterOwnStateProps &
  AccountRegisterOwnDispatchProps;

// interface AccountRegisterFormValues {
//   username: string
//   password: string
//   confirm: string
// }

const AccountRegister = ({ register, pending }: AccountRegisterProps) => {
  const [form] = Form.useForm();

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

  function onFinish(values: Store) {
    resetHelp();
    setRegistering(true);
    register({
      username: values.username,
      password: values.password,
    }, registerCallback);
  }

  function onFinishFailed({ errorFields }: ValidateErrorEntity) {
    form.scrollToField(errorFields[0].name);
  }

  return (
    <Form
      className={styles["register-form"]}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <Form.Item
        name="username"
        help={usernameHelp}
        validateStatus={usernameStatus}
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
          ...usernameRules,
        ]}
      >
        <Input
          placeholder="用户名"
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        />
      </Form.Item>

      <Form.Item
        name="password"
        help={passwordHelp}
        validateStatus={passwordStatus}
        rules={[
          {
            required: true,
            message: "请输入密码",
          },
          ...passwordRules,
        ]}
      >
        <Input
          type="password"
          placeholder="密码"
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        help={passwordHelp}
        validateStatus={passwordStatus}
        rules={[
          {
            required: true,
            message: "请再输入一次密码",
          },
          ({ getFieldValue }) => ({
            validator(_rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("两次密码不一致");
            },
          }),
        ]}
      >
        <Input
          type="password"
          placeholder="确认密码"
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
        />
      </Form.Item>

      <Form.Item>
        <Form.Item
          noStyle
          name="agreement"
          valuePropName="checked"
          rules={[
            (({ getFieldValue }) => ({
              validateTrigger: ["onChange"],
              validator(_, value) {
                if (value) {
                  return Promise.resolve();
                }
                if (
                  getFieldValue("username") &&
                  getFieldValue("password") &&
                  getFieldValue("confirm")
                ) {
                  return Promise.reject("需要同意协议");
                }
                return Promise.resolve();
              }
            })),
          ]}
        >
          <Checkbox>我已阅读</Checkbox>
        </Form.Item>
        <a>服务协议</a>
        <Link
          className={styles["register-form-registered"]}
          to={Routes.USER_LOGIN}
        >
          已注册?
        </Link>
      </Form.Item>

      <Form.Item>
        <Button
          className={styles["register-form-button"]}
          type="primary"
          htmlType="submit"
          loading={pending || registering}
        >
          注册
        </Button>
      </Form.Item>

    </Form>
  );
};

const mapStateToProps = (state: ApplicationState): AccountRegisterOwnStateProps => ({
  pending: state.auth.pending,
});

const mapDispatchToProps = (dispatch: AccountRegisterDispatch): AccountRegisterOwnDispatchProps => ({
  register: (user, cb) => dispatch(iu.register(user, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountRegister);
