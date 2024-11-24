import React, { useEffect } from "react";

import { Button, Card, Col, Form, Image, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import CONSTANTS, { appRoot } from "../../../util/constant/CONSTANTS";
import useHttp from "../../../hooks/use-http";
import { getAuthToken, setAuthDetails } from "../../../util/API/authStorage";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import logo from "../../../asset/logos/logo.png";

const LogIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = getAuthToken() !== undefined && getAuthToken() !== null;
    // console.log(isLogin, "loh", getAuthToken());
    if (isLogin) {
      // console.log(isLogin, "loh2", getAuthToken());
      navigate(appRoot);
    }
  }, []);
  // navigate(appRoot);
  const API = useHttp();


  const validateLogin = (value) => {
    const payload = {
      email: value.email,
      password: value.password,
    };
    // window.location.assign(appRoot);
    // console.log(payload);
    API.sendRequest(
      CONSTANTS.API.login,
      (res) => {
        console.log(res)
        setAuthDetails(res?.token);
        // setLoadings([]);
        window.location.assign(appRoot);
      },
      payload,
      "LogIn Successful"
    );
  };

  return (
    <>

      <div
        className="h-screen flex justify-center  items-center"
        style={{ background: "#afc9b5" }}
      >
        <Row className="">
          <Col span={11} sm={24} xs={24} md={11} lg={11}>
            <div className="mr-10  flex content-center justify-center">
              <Image
                src={logo}
                alt="Bash"
                preview={false}
                width={700}
                className="p-5"
              />
            </div>
          </Col>
          <Col span={12} sm={24} xs={24} md={12} lg={12}>
            <Card className="shadow-xl" style={{ background: "#fff", border: "none" }}>
              <p className="text-3xl mb-5 font-medium	">Login</p>
              {/* <FormWithButton
                menu="LOGIN_PAGE_MODAL"
                name="Login"
                onCreate={(element) => {
                  console.log(element);
                }}
                inline={false}
              /> */}
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={validateLogin}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Your Email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                    type="email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={API?.isLoading}

                  // disabled
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
        {/* <Registration /> */}
      </div>
    </>
  );
};
export default LogIn;
