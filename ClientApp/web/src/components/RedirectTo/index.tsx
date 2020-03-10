import React from "react";
import { LocationDescriptor } from "history";
import { Redirect } from "react-router";

interface RedirectToReceivedProps {
  redirectUrl?: LocationDescriptor
  children: React.ReactNode
}

type RedirectToProps = RedirectToReceivedProps

const RedirectTo = ({ redirectUrl, children }: RedirectToProps) => (
  <>
    {
      typeof redirectUrl === "undefined"
        ? children
        : <Redirect to={redirectUrl} />
    }
  </>
);

export default RedirectTo;
