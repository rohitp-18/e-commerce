import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function ProtectRoute(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (!loading && !user) {
      sessionStorage.setItem("link", location.pathname);
      navigate("/login");
    }

    if (user && props.user) {
      if (props.user !== user.role) {
        navigate(-3);
      }
    }
  }, [user]);
  return (
    <>
      {props.role ? (
        props.role === user.role && <>{user && props.children}</>
      ) : (
        <>{user && props.children}</>
      )}
    </>
  );
}

export default ProtectRoute;
