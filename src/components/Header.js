import { Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import React from "react";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAuthen } from "../redux/reducer";
function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state);

  const logout = () => {
    dispatch(setAuthen(false));
    localStorage.authenticated = false;
  };
  return (
    <div className="header">
      <div className="logo-wrapper">
        <img src="logo_black.png" />
      </div>
      {isAuthenticated && (
        <Button
          type="primary"
          danger
          icon={<PoweroffOutlined />}
          onClick={() => logout()}
          shape="round"
        >
          Log Out
        </Button>
      )}
    </div>
  );
}

export default Header;
