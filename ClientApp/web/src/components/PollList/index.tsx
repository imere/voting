import React, { useEffect, useState } from "react";
import { useFetch } from "use-http";
import { Empty } from "antd";

import Fallback from "@/components/Fallback";
import { API_POLL } from "@/shared/conf";
import { ResponseState } from "@/data-types";
import { None } from "@/types";

const PollList: React.FunctionComponent = () => {
  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    polls,
    setPolls
  ] = useState([]);

  const [
    request,
    response
  ] = useFetch(API_POLL);

  async function getPolls() {
    setLoading(true);
    await request.get();
    setLoading(false);
    if (response.ok) {
      const res: ResponseState = await response.json();
      setPolls(res.data);
    }
  }

  useEffect(() => {
    getPolls();
  }, []);

  function render(loading: boolean, polls: any[] | None) {
    if (loading) {
      return <Fallback />;
    } else {
      if (polls && polls.length) {
        return <>{JSON.stringify(polls)}</>;
      } else {
        return <Empty style={{ paddingTop: "100px" }} />;
      }
    }
  }

  return render(loading, polls);
};

export default PollList;
