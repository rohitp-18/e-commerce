import React, { useState, useEffect, useContext } from "react";
import {
  FormControl,
  IconButton,
  InputLabel,
  InputAdornment,
  Input,
  Box,
  TextField,
  Avatar,
} from "@mui/material";
import {
  VisibilityOff,
  EmailOutlined,
  AccountCircle,
  LockOutlined,
  Visibility,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./loginSignup.scss";
import { loginAction, signupAction } from "../../redux/actions/userAction";
import { AlertContext } from "../layout/alertProvider";
import Loader from "../layout/Loader";

function LoginSignup() {
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const [tab, setTab] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sendAlert } = useContext(AlertContext);
  const { user, loading, message, error } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    if (tab === "login") {
      return loginHandler();
    }
    registerHandler();
  };

  const loginHandler = () => {
    if (!email || !password) {
      console.log("please fill all required fields");
    }
    dispatch(loginAction({ email, password }));
  };

  const registerHandler = () => {
    if (!email || !password || !confirmPassword || !name) {
      console.log("Please fill all required");
    }

    if (confirmPassword !== password) {
      console.log("Password should be match");
    }
    dispatch(signupAction({ name, email, password, image }));
  };

  const toggle = (tabName) => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTab(tabName);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changeImage = (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      if (sessionStorage.getItem("link")) {
        navigate(sessionStorage.getItem("link"));
      }
    }
  }, [dispatch, user, navigate]);

  useEffect(() => {
    if (message) {
      sendAlert(message, "success");
    }
    if (error) {
      sendAlert(error, "error");
    }
  }, [message, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        !user && (
          <section className="login-form">
            <div className="switchTabs">
              <p
                className={`${tab === "login" && "tab"}`}
                onClick={() => toggle("login")}
              >
                LOGIN
              </p>
              <p
                className={`${tab !== "login" && "tab"}`}
                onClick={(e) => toggle("register")}
              >
                REGISTER
              </p>
            </div>
            <form
              onSubmit={(e) => submitHandler(e)}
              className={`loginform ${tab === "login" && "none"}`}
            >
              <Box
                sx={{
                  display: tab === "login" ? "none" : "flex",
                  alignItems: "flex-end",
                }}
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  name="name"
                  required={tab !== "login"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ width: "25ch" }}
                  label="Your Name"
                  variant="standard"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <EmailOutlined
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  required
                  name="email"
                  sx={{ width: "25ch" }}
                  value={email}
                  label="Email"
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: tab === "login" ? "none" : "flex",
                  alignItems: "flex-end",
                }}
              >
                <LockOutlined sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  type="password"
                  required={tab !== "login"}
                  name="conPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ width: "25ch" }}
                  label="Password"
                  variant="standard"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LockOutlined sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <FormControl sx={{ width: "25ch" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    {`${tab === "login" ? "Password" : "Confirm Password"}`}
                  </InputLabel>
                  <Input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: tab === "login" ? "none" : "flex",
                  alignItems: "center",
                  ml: 0.5,
                }}
              >
                <Avatar
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  src={image}
                />
                <input
                  name="image"
                  required={tab !== "login"}
                  // value={image}
                  accept="image/*"
                  onChange={(e) => changeImage(e)}
                  sx={{ width: "25ch" }}
                  type="file"
                  variant="standard"
                />
              </Box>
              <Box>
                <Link className="forgot-password" to="/password/forgot">
                  forgot password?
                </Link>
                <input
                  type="submit"
                  className="submit-button"
                  value={`${tab === "login" ? "LOGIN" : "SIGN UP"}`}
                />
              </Box>
              <Box
                style={{
                  fontSize: "15px",
                  display: tab === "login" ? "block" : "none",
                }}
              >
                Don't have an account?{" "}
                <span
                  style={{ display: "inline" }}
                  className="forgot-password"
                  onClick={() => toggle("register")}
                >
                  Sign UP
                </span>
              </Box>
              <Box
                style={{ fontSize: "15px", display: tab === "login" && "none" }}
              >
                already have an account?{" "}
                <span
                  style={{ display: "inline" }}
                  className="forgot-password"
                  onClick={() => toggle("login")}
                >
                  Login
                </span>
              </Box>
            </form>
          </section>
        )
      )}
    </>
  );
}

export default LoginSignup;
