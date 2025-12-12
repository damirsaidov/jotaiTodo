import { Space } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div>
        <Space className='lars'>
          <Space>
            <Link to={"/"}>Sync Jotai</Link>
            <Link to={"/async"}>Async Jotai</Link>
          </Space>
        </Space>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
