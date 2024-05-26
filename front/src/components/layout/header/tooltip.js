import {
  AccountCircleOutlined,
  Dashboard,
  Home,
  Logout,
} from "@mui/icons-material";
import { Avatar, SpeedDial, SpeedDialAction } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../redux/actions/userAction";
import "./tooltip.scss";

function Tooltip() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dashboard = () => {
    navigate("/admin");
  };

  const myAccount = () => {
    navigate("/account");
  };

  const home = () => {
    navigate("/");
  };

  const logout = () => {
    setShow(false);
    dispatch(logoutAction());
  };
  const [actions, setActions] = useState([
    { icon: <AccountCircleOutlined />, label: "My Account", click: myAccount },
    { icon: <Home />, label: "Home", click: home },
    { icon: <Logout />, label: "logout", click: logout },
  ]);

  useEffect(() => {
    if (user && user.role === "admin" && actions.length === 3) {
      setShow(true);
      setActions([
        {
          icon: <Dashboard />,
          label: "dashboard",
          click: dashboard,
        },
        ...actions,
      ]);
    }
    if (user) {
      setShow(true);
    }
    // eslint-disable-next-line
  }, [user, dispatch]);
  return (
    <>
      {show && (
        <SpeedDial
          className="tooltip"
          icon={
            <Avatar
              src={user.avatar.url}
              sx={{
                width: "100%",
                background: "blue",
                height: "100%",
              }}
            />
          }
          ariaLabel="SpeedDial playground example"
          direction="down"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.label}
              tooltipTitle={action.label}
              icon={action.icon}
              onClick={action.click}
            />
          ))}
        </SpeedDial>
      )}
    </>
  );
}

export default Tooltip;
