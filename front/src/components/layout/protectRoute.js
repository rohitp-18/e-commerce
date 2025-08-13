import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PageNot from "./pageNot";

function ProtectRoute(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!loading && !user) {
      navigate(`/login?back=${location.pathname}`);
    }

    // if (user && props.user) {
    //   if (props.user !== user.role) {
    //     navigate(-1);
    //   }
    // }
  }, [user, loading, navigate, location.pathname, props.user]);
  return (
    <>
      {props.user ? (
        user ? (
          <>{props.user === user.role ? props.children : <PageNot />}</>
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
