import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import AccountFormLayout from "./index";

test("AccountFormLayout renders Logo", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Route path="/">
        <AccountFormLayout>{}</AccountFormLayout>
      </Route>
    </BrowserRouter>
  );
  const ele = getByText("问卷系统");
  expect(ele).toBeInTheDocument();
});
