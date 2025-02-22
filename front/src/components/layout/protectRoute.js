import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PageNot from "./pageNot";

function ProtectRoute(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    console.log("first");
    if (!loading && !user) {
      sessionStorage.setItem("link", location.pathname);
      navigate("/login");
    }

    // if (user && props.user) {
    //   if (props.user !== user.role) {
    //     navigate(-3);
    //   }
    // }
  }, [user, error, loading]);
  return (
    <>
      {props.user ? (
        user ? (
          <>{props.user === user.role && props.children}</>
        ) : (
          <PageNot />
        )
      ) : (
        <>{user && props.children}</>
      )}
    </>
  );
}

export default ProtectRoute;
