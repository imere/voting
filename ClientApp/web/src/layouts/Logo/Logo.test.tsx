import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Logo from "./index";

test("Logo renders text", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Route path="/">
        <Logo mode="vertical-left" theme="light" />
      </Route>
    </BrowserRouter>
  );
  const ele = getByText("问卷系统");
  expect(ele).toBeInTheDocument();
});
