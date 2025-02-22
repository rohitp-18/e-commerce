import { AccountCircle, CameraAlt, EmailOutlined } from "@mui/icons-material";
import { Avatar, Box, TextField } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./updateuser.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadRequest, updateUser } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import {
  CLEAR_ERRORS,
  UPDATE_USER_RESET,
} from "../../redux/constants/userConstants";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";
import { AlertContext } from "../layout/alertProvider";

function UpadateUser() {
  const {
    isUpdate,
    error,
    loading: loader,
  } = useSelector((state) => state.update);
  const { user, loading } = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState();
  const [temoImage, setTempImage] = useState();
  const { sendAlert } = useContext(AlertContext);
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email) {
      sendAlert("please fill all required fields", "error");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("email", email);

    if (image === user.avatar.url) {
      dispatch(updateUser(form));
      return;
    }

    form.append("image", temoImage);

    dispatch(updateUser({ name, email, image }));
  };

  const fileUpload = (e) => {
    if (!e.target.files || !e.target.files[0]) return;

    const reader = new FileReader();

    setTempImage(e.target.files[0]);

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    console.log("first");
    if (isUpdate) {
      sendAlert("Profile has been upadated successfully", "success");
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(loadRequest());
      navigator("/account");
    }

    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
    // eslint-disable-next-line
  }, [isUpdate, error, dispatch, navigator]);
  return (
    <>
      <MetaData title="Edit Profile" />
      {loading ? (
        <Loader />
      ) : (
        <section className="updateUser">
          <form onSubmit={(e) => submitHandler(e)}>
            <h3>Edit Profile</h3>
            <div
              className="avatar-div"
              onClick={() => inputFile.current.click()}
            >
              <Avatar
                sizes="medium"
                src={image ? image : user.avatar && user.avatar.url}
              />
              <CameraAlt className="camera" />
              <input
                name="file"
                type="file"
                ref={inputFile}
                accept="image/*"
                style={{ display: "none" }}
                value=""
                onChange={(e) => fileUpload(e)}
              />
            </div>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ width: "25ch" }}
                label="Your Name"
                variant="standard"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <EmailOutlined sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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

            <button disabled={loader} className="submit" type="submit">
              Update
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default UpadateUser;
