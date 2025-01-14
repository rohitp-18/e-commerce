import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function ProtectRoute(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (!loading && !user && error) {
      sessionStorage.setItem("link", location.pathname);
      navigate("/login");
    }

    if (user && props.user) {
      if (props.user !== user.role) {
        navigate(-3);
      }
    }
  }, [user, error]);
  return (
    <>
      {props.user ? (
        user && <>{props.user === user.role && props.children}</>
      ) : (
        <>{user && props.children}</>
      )}
    </>
  );
}

export default ProtectRoute;
