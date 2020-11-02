import React from "react";
import PropTypes from "prop-types";
import "./Login.scss";
import { Form, Input, Button, Checkbox, Row, message } from "antd";
import { authen } from "../api/index";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAuthen } from "../redux/reducer";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state);
  const onFinish = (values) => {
    console.log("Success:", values);
    authen(values)
      .then((res) => {
        console.log("dispatch set authen");
        dispatch(setAuthen(res.data.authenticated));
        localStorage.setItem("authenticated", res.data.authenticated);
      })
      .catch((error) => {
        console.log(error);
        message.error("Invalid credentials, pleasa try again.");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Row className="Login-wrapper" justify="center" align="center">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

Login.propTypes = {};

export default Login;
