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
  Dashboard,
  Restore,
} from "@mui/icons-material";
import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  Avatar,
  Box,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  createSearch,
  searchAction,
} from "../../../redux/actions/searchAction";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [word, setWord] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const dispatch = useDispatch();
  const { searches } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const location = useLocation();

  function callSearch() {
    navigate(`/search?q=${word}`);
    dispatch(createSearch({ query: word }));
  }

  const setKey = (e) => {
    setWord(e.target.value);
    dispatch(searchAction(e.target.value));

    if (e.keyCode === 13) {
      callSearch();
      return;
    }
  };

  useEffect(() => {
    if (location.search) {
      setSearch(true);
      setWord(
        decodeURIComponent(
          location.search ? location.search.split("=")[1] : ""
        ).toString()
      );
    }
  }, [location.search]);

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
            <a
              style={{ textDecoration: "none" }}
              href={`/login?back=${location.pathname}`}
            >
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
                        src={user.avatar?.url}
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
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/login?back=${location.pathname}`}
                    >
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
                <Link to="/orders">
                  <ShoppingBagOutlined />
                  <span>Orders</span>
                </Link>
                {user && user.role === "admin" && (
                  <Link to="/admin">
                    <Dashboard />
                    <span>Dashboard</span>
                  </Link>
                )}
                {user && user.role === "seller" && (
                  <Link to="/seller">
                    <Dashboard />
                    <span>Dashboard</span>
                  </Link>
                )}
              </div>
              <Link to="/help">Get Help?</Link>
            </div>
          </Drawer>

          <Box className="search z-[2000]">
            <div className="relative">
              <TextField
                type="search"
                name="search"
                placeholder="Search..."
                value={word}
                onKeyDown={setKey}
                onChange={(e) => setWord(e.target.value)}
                onFocusCapture={() => {
                  setSearchOpen(true);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setSearchOpen(false);
                  }, 300);
                }}
                className="w-full"
              />
              {word && searchOpen && (
                <div className="absolute top-full left-0 right-0 w-full z-[2100] mt-2 bg-white rounded-xl border border-gray-200 shadow-lg max-h-72 overflow-y-auto transition-all">
                  {searches.length === 0 ? (
                    <div className="flex flex-col items-center py-6 px-4 text-gray-400">
                      <Search className="mb-2 text-3xl text-gray-900" />
                      <span className="text-base font-medium">
                        No search found
                      </span>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {searches.map((query) => (
                        <li
                          key={query._id}
                          onClick={() => {
                            setWord(query.query);
                            navigate(`/search?q=${query.query}`);
                            dispatch(createSearch({ query: query.query }));
                            setSearchOpen(false);
                            setSearch(true);
                          }}
                          className="cursor-pointer hover:bg-indigo-50 px-4 py-3 text-sm text-gray-800 flex items-center gap-3 transition-colors"
                        >
                          {user ? (
                            query.user === user._id ? (
                              <Restore className="text-indigo-900" />
                            ) : (
                              <Search className="text-indigo-900" />
                            )
                          ) : (
                            <Search className="text-indigo-900" />
                          )}
                          <span className="truncate">{query.query}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </Box>

          <div className="nav-icons gap-3">
            {user && user.role === "admin" && (
              <Link to="/admin">
                <Dashboard />
                <span>Dashboard</span>
              </Link>
            )}
            {user && user.role === "seller" && (
              <Link to="/seller">
                <Dashboard />
                <span>Dashboard</span>
              </Link>
            )}
            <Link
              to={`${user ? "/account" : `/login?back=${location.pathname}`}`}
            >
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
            <Box className="search z-[2000]">
              <div className="relative">
                <TextField
                  type="search"
                  name="search"
                  placeholder="Search..."
                  value={word}
                  onKeyDown={setKey}
                  onChange={(e) => setWord(e.target.value)}
                  onFocusCapture={() => {
                    setSearchOpen(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setSearchOpen(false);
                    }, 300);
                  }}
                  className="w-full"
                />
                {word && searchOpen && (
                  <div className="absolute top-full left-0 right-0 w-full z-[2100] mt-2 bg-white rounded-xl border border-gray-200 shadow-lg max-h-72 overflow-y-auto transition-all">
                    {searches.length === 0 ? (
                      <div className="flex flex-col items-center py-6 px-4 text-gray-400">
                        <Search className="mb-2 text-3xl text-gray-900" />
                        <span className="text-base font-medium">
                          No search found
                        </span>
                      </div>
                    ) : (
                      <ul className="divide-y divide-gray-100">
                        {searches.map((query) => (
                          <li
                            key={query._id}
                            onClick={() => {
                              setWord(query.query);
                              navigate(`/search?q=${query.query}`);
                              dispatch(createSearch({ query: query.query }));
                              setSearchOpen(false);
                              setSearch(true);
                            }}
                            className="cursor-pointer hover:bg-indigo-50 px-4 py-3 text-sm text-gray-800 flex items-center gap-3 transition-colors"
                          >
                            <Search className="text-indigo-900" />
                            <span className="truncate">{query.query}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </Box>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
