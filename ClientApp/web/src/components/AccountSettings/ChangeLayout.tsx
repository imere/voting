import React from 'react';
import { Switch } from 'antd';

import SessionStates from '@/constants/session-states';
import { useSessionState } from '@/hooks/useSessionState';

const ChangeLayout: React.FC = () => {
  const [
    useTML,
    toggleLayout
  ] = useSessionState<boolean>(SessionStates.useTML, true);

  return (
    <div>
      顶栏布局
      <Switch
        defaultChecked={useTML}
        onClick={() => {
          toggleLayout((v) => !v);
          window.location.reload();
        }}
      />
    </div>
  );
};

export default ChangeLayout;
