import { Button, Result } from "antd";
import React from "react";

const Error = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() => {
            window.location.assign("/");
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default Error;
