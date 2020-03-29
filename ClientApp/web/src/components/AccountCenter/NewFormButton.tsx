import React, { useState } from "react";
import { Button } from "antd";
import { Store } from "rc-field-form/es/interface";
import { Redirect } from "react-router";

import { Routes } from "@/constants";

import styles from "./NewFormButton.module.scss";
import NewFormModal from "./NewFormModal";

const NewFormButton = () => {
  const [
    visible,
    setVisible
  ] = useState(false);

  const [
    params,
    setParams
  ] = useState(new URLSearchParams());

  function onCreate({ title, description, pub }: Store) {
    setVisible(false);
    const p = new URLSearchParams();
    title && p.append("title", encodeURIComponent(title));
    description && p.append("description", encodeURIComponent(description));
    pub && p.append("public", encodeURIComponent(pub));
    setParams(p);
  }

  return (
    <>
      {
        params.get("title") ? (
          <Redirect to={`${Routes.POLL_NEW}?${params}`} />
        ) : (
          <div className={styles["button-new-form"]}>
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
        )
      }
    </>
  );
};

export default NewFormButton;
