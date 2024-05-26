import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./account.scss";
import { loadRequest } from "../../redux/actions/userAction";
import Loader from "../layout/Loader";
import MetaData from "../layout/header/MetaData";

function AccountInfo() {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRequest());
  }, [dispatch]);

  return (
    <>
      <MetaData title="Account" />
      {loading ? (
        <Loader />
      ) : (
        <section className="account-info">
          <h1>Account Info</h1>
          <div className="account-flex">
            <div className="div-img">
              <img src={user.avatar.url} alt={user.name} />
              <button onClick={() => navigate("/user/update")}>
                Edit Profile
              </button>
            </div>
            <div className="account">
              <div>
                <h2>Name</h2>
                <p>{user.name}</p>
              </div>
              <div>
                <h2>Email</h2>
                <p>{user.email}</p>
              </div>
              <div>
                <h2>Created At</h2>
                <p>{user.createdAt.toString().slice(0, 10)}</p>
              </div>

              <div className="button-div">
                <button onClick={() => navigate("/orders")}>My Orders</button>
                <button onClick={() => navigate("/user/password")}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default AccountInfo;
