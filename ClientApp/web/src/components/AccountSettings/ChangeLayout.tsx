import React from 'react';
import { Switch } from 'antd';

import SessionStates from '@/hooks/SessionStates';
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
          location.reload();
        }}
      />
    </div>
  );
};

export default ChangeLayout;
