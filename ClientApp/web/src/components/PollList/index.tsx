import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "use-http";
import { Empty } from "antd";

import { API_POLL } from "@/shared";

import Fallback from "../Fallback";

const PollList: React.FunctionComponent = () => {
  const [
    polls,
    setPolls
  ] = useState(null);

  const [
    request,
    response
  ] = useFetch(API_POLL);

  function addPolls(result: any) {
    setPolls(result.data);
  }

  async function getPolls() {
    await request.get();
    if (response.ok) {
      addPolls(await response.json());
    } else {
      addPolls([]);
    }
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      return;
    }
    mounted.current = true;
    getPolls();
  });

  function render() {
    if (null === polls) {
      return <Fallback />;
    } else {
      if (undefined === polls || !(polls as any).length) {
        return <Empty style={{ paddingTop: "100px" }} />;
      } else {
        return <>{JSON.stringify(polls)}</>;
      }
    }
  }

  return render();
};

export default PollList;
