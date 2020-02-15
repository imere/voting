import React, { useState } from "react";
import { Button } from "antd";

import { None } from "@/types";

import NewFormModal from "./NewFormModal";

const NewFormButton = () => {
  const [
    visible,
    setVisible
  ] = useState(false);

  const [
    formRef,
    setFormRef
  ] = useState<any>(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    const { form } = formRef.props;
    form.validateFields((err: Error | None, values: any) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);
      form.resetFields();
      setVisible(false);
    });
  };

  const saveFormRef = (ref: any) => {
    setFormRef(ref);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        新问卷
      </Button>
      <NewFormModal
        ref={saveFormRef}
        visible={visible}
        onCancel={handleCancel}
        onCreate={handleCreate}
      />
    </>
  );
};

export default NewFormButton;
