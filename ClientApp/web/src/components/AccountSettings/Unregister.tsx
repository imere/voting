import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

import { toastMessageByStatus } from '@/framework/shared/toast-message';
import { Disp } from '@/typings/types';
import { ApplicationState } from '@/store/state';
import { AuthAction } from '@/store/actions/action-auth';
import { deleteUser } from '@/framework/shared/request-util';

type UnregisterDispatch = Disp<ApplicationState, null, AuthAction>

interface UnregisterOwnDispatchProps {
  logout: () => void
}

interface UnregisterState {
  loading: boolean
}

type UnregisterProps = UnregisterOwnDispatchProps

class Unregister extends React.PureComponent<UnregisterProps, UnregisterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleUnregisterClick = async () => {
    this.setState({ loading: true });
    const response = await deleteUser().
      catch((ex) => {
        toastMessageByStatus(500);
        return ex;
      });
    if (response.ok) {
      this.props.logout();
    }
    toastMessageByStatus(response.status);
    this.setState({ loading: false });
  }

  render() {
    return (
      <Button
        danger
        loading={this.state.loading}
        onClick={() => this.handleUnregisterClick()}
      >
        注销
      </Button>
    );
  }
}

const mapDispatchToProps = (dispatch: UnregisterDispatch): UnregisterOwnDispatchProps => ({
  logout: () => import('@/store/actions/auth').then(({ iu }) => dispatch(iu.logout())),
});

const UnregisterComponent = connect(null, mapDispatchToProps)(Unregister);

export {
  UnregisterComponent as Unregister,
};
