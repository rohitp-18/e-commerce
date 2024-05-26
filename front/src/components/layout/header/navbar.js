import React, { useState } from "react";
import {
  AccountCircleOutlined,
  NotificationsNoneOutlined,
  ShoppingCartOutlined,
  Search,
  Clear,
  Menu,
  Home,
  Group,
} from "@mui/icons-material";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Drawer, Avatar } from "@mui/material";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const change = (e) => {};
  const { user } = useSelector((state) => state.user);

  return (
    <nav>
      <div className="nav">
        <div className="nav-items">
          <Menu className="menu" onClick={() => setOpen(true)} />
          <div className="logo">E-Commerce</div>
          <Search
            className="menu"
            style={{ right: "20px", left: "unset" }}
            onClick={() => navigate("/search")}
          />

          <Drawer className="drawer" open={open} onClose={() => setOpen(false)}>
            <div className="drawer">
              <Clear className="clear" onClick={() => setOpen(false)} />

              <div className="profile">
                {user ? (
                  <>
                    <div onClick={() => navigate("/account")}>
                      <Avatar
                        src={user.avatar.url}
                        sx={{
                          marginTop: "50px",
                          width: "100px",
                          height: "100px",
                        }}
                      />
                      <h2>{user.name}</h2>
                      <span>{user.email}</span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="navigate">
                <div onClick={() => navigate("/")}>
                  <Home />
                  <span>Home</span>
                </div>
                <div onClick={() => navigate("/about")}>
                  <Group />
                  <span>About Us</span>
                </div>
                <div onClick={() => navigate("/cart")}>
                  <ShoppingCartOutlined />
                  <span>Cart</span>
                </div>
                <div onClick={() => navigate("/notify")}>
                  <NotificationsNoneOutlined />
                  <span>Notification</span>
                </div>
              </div>
              <a href="/help">Get Help?</a>
            </div>
          </Drawer>

          <Link className="search" to="/search">
            <Search className="search-icon" />
            <input placeholder="Search Products..." type="search" />
            <Clear className="clear" />
          </Link>

          <div className="nav-icons">
            <button onClick={() => navigate("/account")}>
              <AccountCircleOutlined />
              <span style={{ display: "block" }}>
                {user ? "Account" : "Login"}
              </span>
            </button>
            <button onClick={() => navigate("/cart")}>
              <ShoppingCartOutlined /> <span>Cart</span>
            </button>
            <button onClick={() => navigate("/orders")}>
              <NotificationsNoneOutlined />
              <span>Notification</span>
            </button>
          </div>
        </div>
        <div className="nav-search">
          <Search className="search-icon" />
          <input
            placeholder="Search Products..."
            onChange={(e) => change(e)}
            type="search"
          />
        </div>
        {/* <Menu lassName="menu" onClick={() => setOpen(!open)} />

<Drawer className="drawer" open={open} onClose={() => setOpen(false)}>
  <div className="drawer-menu"></div>
</Drawer> */}
      </div>
    </nav>
  );
}

export default Navbar;
