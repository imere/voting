import React, { useState } from "react";
import { Button } from "antd";
import { Store } from "rc-field-form/lib/interface";

import NewFormModal from "./NewFormModal";

const NewFormButton = () => {
  const [
    visible,
    setVisible
  ] = useState(false);

  function onCreate(values: Store) {
    console.log(values);
    setVisible(false);
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        新问卷
      </Button>
      <NewFormModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default NewFormButton;
