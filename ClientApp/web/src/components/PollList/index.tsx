import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "use-http";
import { Empty } from "antd";

import { API_POLL } from "@/shared";

const PollList: React.FC = () => {
  const [
    polls,
    setPolls
  ] = useState([]);

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

  return (
    polls.length
      ? <>{JSON.stringify(polls)}</>
      : <Empty style={{ paddingTop: "100px" }} />
  );
};

export default PollList;
