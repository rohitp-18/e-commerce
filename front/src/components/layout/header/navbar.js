import React, { useEffect, useState } from "react";
import {
  AccountCircleOutlined,
  NotificationsNoneOutlined,
  ShoppingCartOutlined,
  Search,
  Clear,
  Menu,
  Home,
  Group,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import "./navbar.scss";
import { useSelector } from "react-redux";
import {
  Drawer,
  Avatar,
  Box,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [word, setWord] = useState();
  const navigate = useNavigate();
  const locat = useLocation();

  const opt = ["hello", "laptop", "tv"];

  const setKey = (e) => {
    e.preventDefault();

    if (e.keyCode === 13) {
      setWord(e.target.value);
      navigate(`/search?q=${e.target.value}`);
      return;
    }
  };

  let val;

  useEffect(() => {
    if (locat.search) {
      setWord(locat.search ? locat.search.split("=")[1] : word);
      setSearch(true);
    }
  }, [locat]);

  const Auto = () => {
    return (
      <Autocomplete
        freeSolo
        options={opt.map((option) => option)}
        renderInput={(params) => (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              {...params}
              placeholder="Search product...."
              value={word}
              onChange={() => setWord(word)}
              onKeyUp={(e) => setKey(e)}
            />
          </Box>
        )}
      />
    );
  };

  const { user } = useSelector((state) => state.user);

  return (
    <nav>
      <div className="nav">
        <div className="nav-items">
          <Menu className="menu" onClick={() => setOpen(true)} />
          <div className="logo">E-Commerce</div>
          <Search
            className="menu"
            style={{ right: "9px", left: "unset" }}
            onClick={() => setSearch(!search)}
          />
          {!user && (
            <a style={{ textDecoration: "none" }} href={"/login"}>
              <Button variant="outlined" size="small" className="login">
                <AccountCircleOutlined /> <span>Login</span>
              </Button>
            </a>
          )}

          <Drawer className="drawer" open={open} onClose={() => setOpen(false)}>
            <div className="drawer">
              <Clear className="clear" onClick={() => setOpen(false)} />

              <div className="profile">
                {user ? (
                  <>
                    <Link to="/account">
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
                    </Link>
                  </>
                ) : (
                  <>
                    <Link style={{ textDecoration: "none" }} to={"/login"}>
                      <Button variant="outlined" size="small" className="login">
                        <AccountCircleOutlined /> <span>Login</span>
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              <div className="navigate">
                <Link to="/">
                  <Home />
                  <span>Home</span>
                </Link>
                <Link to="/about">
                  <Group />
                  <span>About Us</span>
                </Link>
                <Link to="/cart">
                  <ShoppingCartOutlined />
                  <span>Cart</span>
                </Link>
                <Link to="/notify">
                  <NotificationsNoneOutlined />
                  <span>Notification</span>
                </Link>
              </div>
              <Link to="/help">Get Help?</Link>
            </div>
          </Drawer>

          <Box className="search">{<Auto />}</Box>

          <div className="nav-icons">
            <Link to="/account">
              <AccountCircleOutlined />
              <span style={{ display: "block" }}>
                {user ? "Account" : "Login"}
              </span>
            </Link>
            <Link to="/cart">
              <ShoppingCartOutlined /> <span>Cart</span>
            </Link>
            <Link to="/orders">
              <ShoppingBagOutlined />
              <span>Orders</span>
            </Link>
            <Link to="/">
              <Home />
              <span>Home</span>
            </Link>
          </div>
        </div>
        {search && (
          <div className="nav-search">
            <Box className="search">
              <Auto />
            </Box>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
