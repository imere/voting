import React from 'react';

import Fallback from '@/layouts/Fallback';

interface LoadingReceivedProps {
  children: React.ReactElement
  loading: boolean
  error?: boolean
}

type LoadingProps = LoadingReceivedProps

const LoadingComponent: React.FC<LoadingProps> = ({ children, loading, error }: LoadingProps) => (
  <div>
    {
      error
        ? (<></>)
        : (
          loading
            ? <Fallback />
            : children
        )
    }
  </div>
);

export { LoadingComponent };
